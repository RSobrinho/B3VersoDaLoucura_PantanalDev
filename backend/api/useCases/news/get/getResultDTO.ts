import { INewsEntityProps } from "entities/interfaces/iNewsEntityProps";

export interface totalsSentiments {
  quantity: number;
  percentage: number;
  label: string;
}

export interface dateNews {
  date: string;
  quantity: number;
}

export interface GetResultDTO {
  total: number;
  sentiment_totals: totalsSentiments[];
  news_per_days: [
    {
      date: string;
      total: number;
    }
  ];
  news: INewsEntityProps[];
}
