import { INewsRepository } from "../../interfaces/iNewsRepository";
import NewsSchema from "../../../databases/MongoDB/newsSchema";
import { NewsEntity } from "../../../entities/implementations/news";
import { INewsEntityProps } from "entities/interfaces/iNewsEntityProps";

export class MongoDBNewsRepository implements INewsRepository {
  async save(news: NewsEntity): Promise<void> {
    await NewsSchema.create(news);
  }

  async findByData(props: INewsEntityProps): Promise<INewsEntityProps> {
    return await NewsSchema.findOne(props).select("-__v").lean();
  }

  async findAll(): Promise<INewsEntityProps[]> {
    return await NewsSchema.find({});
  }

  async find(data?: {}): Promise<INewsEntityProps[]> {
    return await NewsSchema.find(data);
  }

  async deleteById(id: string): Promise<boolean> {
    let deleted = false;
    const newsDeleted = await NewsSchema.findByIdAndDelete(id);

    if (newsDeleted !== null) {
      deleted = true;
    }

    return deleted;
  }

  async updateById({ _id, ...props }: INewsEntityProps): Promise<object> {
    await NewsSchema.updateOne({ _id }, props);
    return await NewsSchema.findById(_id);
  }

  async findByFilter(
    data: { page?: number; limit?: number } & INewsEntityProps
  ): Promise<object> {
    let { limit, page, ...props } = data;

    if (!limit) {
      limit = 10;
    }
    if (!page) {
      page = 1;
    }

    const total = await NewsSchema.countDocuments(props);
    const offsets = Math.ceil(total / limit);
    const offset = (page - 1) * limit;

    const newss = await NewsSchema.find(props)
      .select(
        "_id name cpf birth email password cep qualified patio complement neighborhood uf"
      )
      .skip(offset)
      .limit(limit);

    return {
      newss,
      total,
      limit,
      offset,
      offsets,
    };
  }
}
