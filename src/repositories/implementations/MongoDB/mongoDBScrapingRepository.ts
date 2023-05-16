import { IScrapingRepository } from "../../interfaces/iScrapingRepository";
import ScrapingSchema from "../../../databases/MongoDB/scrapingSchema";
import { ScrapingEntity } from "../../../entities/implementations/scraping";
import { IScrapingEntityProps } from "entities/interfaces/iScrapingEntityProps";

export class MongoDBScrapingRepository implements IScrapingRepository {
  async save(news: ScrapingEntity): Promise<void> {
    await ScrapingSchema.create(news);
  }

  async findByData(props: IScrapingEntityProps): Promise<IScrapingEntityProps> {
    return await ScrapingSchema.findOne(props).select("-__v").lean();
  }

  async findAll(): Promise<IScrapingEntityProps[]> {
    return await ScrapingSchema.find({});
  }

  async find(data?: {}): Promise<IScrapingEntityProps[]> {
    return await ScrapingSchema.find(data);
  }

  async deleteById(id: string): Promise<boolean> {
    let deleted = false;
    const newsDeleted = await ScrapingSchema.findByIdAndDelete(id);

    if (newsDeleted !== null) {
      deleted = true;
    }

    return deleted;
  }

  async updateById({ _id, ...props }: IScrapingEntityProps): Promise<object> {
    await ScrapingSchema.updateOne({ _id }, props);
    return await ScrapingSchema.findById(_id);
  }

  async findByFilter(
    data: { page?: number; limit?: number } & IScrapingEntityProps
  ): Promise<object> {
    let { limit, page, ...props } = data;

    if (!limit) {
      limit = 10;
    }
    if (!page) {
      page = 1;
    }

    const total = await ScrapingSchema.countDocuments(props);
    const offsets = Math.ceil(total / limit);
    const offset = (page - 1) * limit;

    const newss = await ScrapingSchema.find(props)
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
