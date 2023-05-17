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

export class CreateUseCase {
  constructor(
    private scrapingRepository: IScrapingRepository,
    private newsRepository: INewsRepository
  ) {}

  async execute(params: CreateDTO): Promise<CreateDTO> {
    const res = params;

    if (params.link) {
      // Fazer scraping direto do link
      const news = await this.scrapingSaveNews({ link: params.link });
      res.news = news;
    } else if (params.initial_date && params.final_date) {
      const initial_date = getDateFormat(params.initial_date);
      const final_date = getDateFormat(params.final_date);
      const updated_at = new Date().toISOString();

      if (new Date(final_date) > new Date()) {
        throw new ValidationError(
          "Data final não pode ser maior que a data de hoje!"
        );
      }

      const date_limit = new Date(updated_at);
      date_limit.setHours(date_limit.getHours() - 2);

      const limit_date = {
        $gte: date_limit,
      };
      const limitScrap = await this.scrapingRepository.find({
        updated_at: limit_date,
      });

      if (limitScrap.length >= 3) {
        throw new ValidationError(
          "Limite alcançado! Você já executou 3 scraping por data dentro de 2 horas, por favor aguarde passar esse tempo para executar novamente!"
        );
      }

      const googleNews = new ScrapingGoogleNews();
      const news = await googleNews.execute(
        new Date(initial_date),
        new Date(final_date)
      );

      // Passa por cada noticia do google e salva
      news.map(async (nw) => {
        await this.scrapingSaveNews(nw);
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
    } else {
      throw new ValidationError("Nenhum parametro válido foi informado!");
    }

    // 1 - webscraping 1 processo

    // 2 - webscraping 2 processo
    // 2.1 - fazer a avaliação da noticia
    // 2.2 - salvar cada noticia avaliada

    // 3 - salvar scraping
    // else {
    //   await this.scrapingRepository.save(newScraping);
    // }

    return res;
  }

  async scrapingSaveNews(params: ScrapingDTO): Promise<NewsEntity> {
    const scrap = new ScrapingNews();
    const res = await scrap.execute(params);

    // Classificar na IA

    const sentiment = {
      positive: 0,
      neutral: 0,
      negative: 0,
    };

    let ct = 0;
    const rand = Math.floor(Math.random() * 2);

    for (let i in sentiment) {
      if (ct == rand) {
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
