import { NewsEntity } from "../../../entities/implementations/news";

export interface CreateDTO {
  initial_date?: string;
  final_date?: string;
  link?: string;
  accepted_total?: number;
  rejected_total?: number;
  news?: NewsEntity;
}
