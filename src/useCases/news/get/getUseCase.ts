import { INewsRepository } from '../../../repositories/interfaces/iNewsRepository'
import { NotFoundError } from '../../../errors/notFoundError'
import { INewsEntityProps } from 'entities/interfaces/iNewsEntityProps'
export class GetUseCase {
  constructor (private newsRepository: INewsRepository) {}

  async execute (): Promise<INewsEntityProps[]> {
    const news = await this.newsRepository.findAll()
    if (news.length === 0) {
      throw new NotFoundError('news')
    }
    return news
  }
}
