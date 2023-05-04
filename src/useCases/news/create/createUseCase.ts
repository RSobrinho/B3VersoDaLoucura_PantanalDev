import { AlreadyOnBaseError } from '../../../errors/alreadyOnBaseError'
import { NewsEntity } from '../../../entities/implementations/news'
import { INewsRepository } from '../../../repositories/interfaces/iNewsRepository'
import { CreateDTO } from './createDTO'
export class CreateUseCase {
  constructor (private newsRepository: INewsRepository) {}

  async execute ({ manual }: CreateDTO): Promise<NewsEntity> {
    const { title, description, date, sentiment } = manual

    const newNews = new NewsEntity({ title, description, date, sentiment })
    if (await this.newsRepository.findByData({ title, description })) {
      throw new AlreadyOnBaseError('news')
    } else {
      await this.newsRepository.save(newNews)
    }

    return newNews
  }
}
