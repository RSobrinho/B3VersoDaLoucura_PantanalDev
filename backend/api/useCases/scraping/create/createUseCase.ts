import { AlreadyOnBaseError } from "../../../errors/alreadyOnBaseError";
import { ValidationError } from "../../../errors/validationError";
import { ScrapingEntity } from "../../../entities/implementations/scraping";
import { NewsEntity } from "../../../entities/implementations/news";
import { IScrapingRepository } from "../../../repositories/interfaces/iScrapingRepository";
import { INewsRepository } from "../../../repositories/interfaces/iNewsRepository";
import { CreateDTO } from "./createDTO";
import { ScrapingDTO } from "./scrapingDTO";
import { getCleanLink, getDateFormat } from "../../../utils/Scraping";
import { ScrapingNews } from "./scrapingNews";
import { ScrapingGoogleNews } from "./scrapingGoogleNews";
import { ClassifyAI } from "./classifyAI";

export class CreateUseCase {
  constructor(
    private scrapingRepository: IScrapingRepository,
    private newsRepository: INewsRepository
  ) {}

  async execute(params: CreateDTO): Promise<CreateDTO> {
    const limit = 5;
    const hours = 1;
    const res = params;
    const AI = new ClassifyAI();

    if (params.link) {
      // Fazer scraping direto do link
      const news = await this.scrapingSaveNews({ link: params.link });

      if (!news) {
        throw new ValidationError(
          "Não foi possivel fazer o scraping desse link!"
        );
      }

      res.news = news;
      res.accepted_total = 1;
      res.rejected_total = 0;
    } else if (params.initial_date && params.final_date) {
      const initial_date = getDateFormat(params.initial_date);
      const final_date = getDateFormat(params.final_date);
      const updated_at = new Date().toISOString();
      let ct = 0;

      if (new Date(final_date) > new Date()) {
        throw new ValidationError(
          "Data final não pode ser maior que a data de hoje!"
        );
      }

      const date_limit = new Date(updated_at);
      date_limit.setHours(date_limit.getHours() - hours);

      const limit_date = {
        $gte: date_limit,
      };
      const limitScrap = await this.scrapingRepository.find({
        updated_at: limit_date,
      });

      if (limitScrap.length >= 5) {
        throw new ValidationError(
          `Limite alcançado! Você já executou ${limit} scraping por data dentro de ${hours} horas, por favor aguarde passar esse tempo para executar novamente!`
        );
      }

      const googleNews = new ScrapingGoogleNews();
      const news = await googleNews.execute(
        new Date(initial_date),
        new Date(final_date)
      );

      // Classificar na IA
      // let counter = 0;
      // const titles: string[] = [];
      // news.map((nw) => {
      //   titles.push(nw.title);
      // });

      // const cl = await AI.execute({
      //   texts: titles,
      // });
      // console.log(cl);

      // Passa por cada noticia do google e salva
      news.map(async (nw) => {
        // nw.sentiment = cl[counter];
        const saveNews = await this.scrapingSaveNews(nw);

        if (!saveNews) ct++;
        // counter++;
      });

      // Fazer scraping das news pelas datas e depois o direto pelos links
      const newScraping = new ScrapingEntity({
        initial_date,
        final_date,
        updated_at,
        num_scraping: 1,
      });

      const scrap = await this.scrapingRepository.findByDataReverse({
        initial_date,
        final_date,
      });

      if (scrap) {
        newScraping.num_scraping += scrap.num_scraping;
      }

      await this.scrapingRepository.save(newScraping);

      res.link = `/news?initial_date=${initial_date}&final_date=${final_date}`;
      res.news = null;
      res.accepted_total = news.length;
      res.rejected_total = ct;
    } else {
      throw new ValidationError("Nenhum parametro válido foi informado!");
    }

    return res;
  }

  async scrapingSaveNews(params: ScrapingDTO): Promise<NewsEntity> {
    const scrap = new ScrapingNews();
    const res = await scrap.execute(params);

    if (!params.sentiment) {
      const ti = res?.title || params?.title;
      const AI = new ClassifyAI();
      const cl = await AI.execute({
        texts: [ti],
      });
      params.sentiment = cl !== null && cl.length > 0 ? cl[0] : 1;
    }

    // Classificar sentimento
    const sentiment = {
      negative: 0,
      neutral: 0,
      positive: 0,
    };

    let ct = 0;

    for (let i in sentiment) {
      if (ct == params.sentiment) {
        sentiment[i] = 100;
      }
      ct++;
    }

    if (res) {
      const newNews = new NewsEntity({
        title: res.title || params.title,
        description: res.content || params.content,
        date: res.date,
        link: getCleanLink(res.link),
        sentiment,
      });

      // Salvar/Atualizar news
      const existNews = await this.newsRepository.findByData({
        link: newNews.link,
      });

      if (existNews) {
        await this.newsRepository.updateById({
          _id: existNews._id,
          title: newNews.title,
          description: newNews.description,
          date: newNews.date,
          sentiment: newNews.sentiment,
        });
      } else {
        await this.newsRepository.save(newNews);
      }

      return newNews;
    }

    return null;
  }
}
