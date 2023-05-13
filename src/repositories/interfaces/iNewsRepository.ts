import { INewsEntityProps } from "../../entities/interfaces/iNewsEntityProps";

export interface INewsRepository {
  save(news: INewsEntityProps): Promise<void>;
  findByData(data: INewsEntityProps): Promise<INewsEntityProps>;
  deleteById(id: string): Promise<boolean>;
  updateById({ _id, ...props }: INewsEntityProps): Promise<object>;
  findByFilter(
    props: { page?: number; limit?: number } & INewsEntityProps
  ): Promise<object>;
  findAll(): Promise<INewsEntityProps[]>;
}
