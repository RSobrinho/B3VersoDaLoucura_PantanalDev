import { INewsRepository } from "../../../repositories/interfaces/iNewsRepository";
import { NotFoundError } from "../../../errors/notFoundError";
import { GetDTO } from "./getDTO";
import { INewsEntityProps } from "entities/interfaces/iNewsEntityProps";
import { getCleanLink } from "../../../utils/Scraping";
import moment from "moment";

export class GetUseCase {
  constructor(private newsRepository: INewsRepository) {}

  async execute(params: GetDTO): Promise<INewsEntityProps[]> {
    const data = { ...params };

    if (params.initial_date && params.final_date) {
      params.date = {
        $gte: params.initial_date,
        $lte: params.final_date,
      };
    }

    if (params.link) {
      params.link = getCleanLink(params.link);
    }

    if (params.sentiment && +params.sentiment >= 0 && +params.sentiment <= 2) {
      switch (+params.sentiment) {
        case 0:
          params["sentiment.negative"] = { $gt: 33 };
          break;
        case 1:
          params["sentiment.neutral"] = { $gt: 33 };
          break;
        case 2:
          params["sentiment.positive"] = { $gt: 33 };
          break;
      }
      params.sentiment = null;
    }

    params.initial_date = null;
    params.final_date = null;

    const filterFields = Object.entries(params).filter(
      (value) => value[1] !== null
    );

    const searchFields: { [k: string]: string | object | number } =
      Object.fromEntries(filterFields);

    // console.log(searchFields);

    const news = await this.newsRepository.find(searchFields);

    if (news.length === 0) {
      throw new NotFoundError("news");
    }
    return news;
  }
}
