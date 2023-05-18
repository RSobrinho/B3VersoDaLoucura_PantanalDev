import { NotFoundError } from "../../../errors/notFoundError";
import { NewsEntity } from "../../../entities/implementations/news";
import { INewsRepository } from "../../../repositories/interfaces/iNewsRepository";
import { UpdateDTO } from "./updateDTO";
export class UpdateUseCase {
  constructor(private newsRepository: INewsRepository) {}

  async execute(id: string, news: UpdateDTO): Promise<NewsEntity> {
    const updateNews = new NewsEntity({ _id: id, ...news });
    if (await this.newsRepository.findByData({ _id: id })) {
      await this.newsRepository.updateById({
        _id: updateNews._id,
        ...news,
      });
    } else {
      throw new NotFoundError("news");
    }

    return updateNews;
  }
}
