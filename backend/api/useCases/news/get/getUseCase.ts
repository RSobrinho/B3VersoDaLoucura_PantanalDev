import { INewsRepository } from "../../../repositories/interfaces/iNewsRepository";
import { NotFoundError } from "../../../errors/notFoundError";
import { GetDTO } from "./getDTO";
import { GetResultDTO, totalsSentiments } from "./getResultDTO";
import { INewsEntityProps } from "entities/interfaces/iNewsEntityProps";
import { getCleanLink } from "../../../utils/Scraping";
import moment from "moment";

export class GetUseCase {
  constructor(private newsRepository: INewsRepository) {}

  async execute(params: GetDTO): Promise<GetResultDTO> {
    const data = { ...params };
    const res: GetResultDTO = {
      total: 0,
      sentiment_totals: null,
      news_per_days: null,
      news: null,
    };

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
    } else {
      const total = news.length;
      const sentiments = {
        quantity: 0,
        percentage: 0,
        label: "",
      };
      const totals: totalsSentiments[] = [];

      for (let i = 0; i < 3; i++) {
        if (i == 0) {
          sentiments.label = "Negative";
        } else if (i == 1) {
          sentiments.label = "Neutral";
        } else {
          sentiments.label = "Positive";
        }

        totals[totals.length] = { ...sentiments };
      }

      news.map((nw) => {
        if (
          nw.sentiment.positive > nw.sentiment.negative &&
          nw.sentiment.positive > nw.sentiment.neutral
        ) {
          totals[2].quantity++;
        } else if (
          nw.sentiment.negative > nw.sentiment.positive &&
          nw.sentiment.negative > nw.sentiment.neutral
        ) {
          totals[0].quantity++;
        } else {
          totals[1].quantity++;
        }

        // organizar em dias
      });

      // fazer porcentagem
      for (let i = 0; i < 3; i++) {
        totals[i].percentage = Math.round((totals[i].quantity / total) * 100);
      }

      res.total = total;
      res.sentiment_totals = totals;
      res.news = news;
    }
    return res;
  }
}
