import { AlreadyOnBaseError } from "../../../errors/alreadyOnBaseError";
import { ScrapingEntity } from "../../../entities/implementations/scraping";
import { IScrapingRepository } from "../../../repositories/interfaces/iScrapingRepository";
import { CreateDTO } from "./createDTO";
export class CreateUseCase {
  constructor(private scrapingRepository: IScrapingRepository) {}

  async execute(params: CreateDTO): Promise<ScrapingEntity> {
    const { initial_date, final_date, updated_at, num_scraping } = params;

    const newScraping = new ScrapingEntity({
      initial_date,
      final_date,
      updated_at,
      num_scraping,
    });

    const scrap = await this.scrapingRepository.findByData({
      initial_date,
      final_date,
    });

    if (scrap) {
      throw new AlreadyOnBaseError("scraping");
    }

    // 1 - webscraping 1 processo

    // 2 - webscraping 2 processo
    // 2.1 - fazer a avaliação da noticia
    // 2.2 - salvar cada noticia avaliada

    // 3 - salvar scraping
    // else {
    //   await this.scrapingRepository.save(newScraping);
    // }

    return newScraping;
  }
}
