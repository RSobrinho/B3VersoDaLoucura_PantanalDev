import { AlreadyOnBaseError } from "../../../errors/alreadyOnBaseError";
import { NewsEntity } from "../../../entities/implementations/news";
import { INewsRepository } from "../../../repositories/interfaces/iNewsRepository";
import { CreateDTO } from "./createDTO";
import { getCleanLink } from "../../../utils/Scraping";

export class CreateUseCase {
  constructor(private newsRepository: INewsRepository) {}

  async execute({ manual }: CreateDTO): Promise<NewsEntity> {
    const { title, description, date, link, sentiment } = manual;

    const newNews = new NewsEntity({
      title,
      description,
      date,
      link: getCleanLink(link),
      sentiment,
    });
    if (await this.newsRepository.findByData({ link: newNews.link })) {
      throw new AlreadyOnBaseError("news");
    } else {
      await this.newsRepository.save(newNews);
    }

    return newNews;
  }
}
