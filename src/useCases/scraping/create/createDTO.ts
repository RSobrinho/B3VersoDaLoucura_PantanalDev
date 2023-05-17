import { NewsEntity } from "../../../entities/implementations/news";

export interface CreateDTO {
  initial_date?: string;
  final_date?: string;
  link?: string;
  news?: NewsEntity;
}
