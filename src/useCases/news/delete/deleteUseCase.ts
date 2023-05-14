import { INewsEntityProps } from "entities/interfaces/iNewsEntityProps";
import { NotFoundError } from "../../../errors/notFoundError";
import { NewsEntity } from "../../../entities/implementations/news";
import { INewsRepository } from "../../../repositories/interfaces/iNewsRepository";
export class DeleteUseCase {
  constructor(private newsRepository: INewsRepository) {}

  async execute(newsProps: INewsEntityProps): Promise<void> {
    const news = new NewsEntity(newsProps);
    if (await this.newsRepository.findByData(news)) {
      await this.newsRepository.deleteById(news._id);
    } else {
      throw new NotFoundError("news");
    }
  }
}
