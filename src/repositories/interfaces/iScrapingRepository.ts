import { IScrapingEntityProps } from "../../entities/interfaces/iScrapingEntityProps";

export interface IScrapingRepository {
  save(news: IScrapingEntityProps): Promise<void>;
  findByData(data: IScrapingEntityProps): Promise<IScrapingEntityProps>;
  deleteById(id: string): Promise<boolean>;
  updateById({ _id, ...props }: IScrapingEntityProps): Promise<object>;
  findByFilter(
    props: { page?: number; limit?: number } & IScrapingEntityProps
  ): Promise<object>;
  findAll(): Promise<IScrapingEntityProps[]>;
  find(data?: {}): Promise<IScrapingEntityProps[]>;
}
