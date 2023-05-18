import { validator } from "../validations/Validator";
import { IScrapingEntityProps } from "../interfaces/iScrapingEntityProps";
import { NewsSchemaValidator } from "../validations/newsSchemaValidator";
import { ValidationError } from "../../errors/validationError";
import { v4 } from "uuid";
export class ScrapingEntity {
  _id: string;
  initial_date: string;
  final_date: string;
  date: string;
  updated_at: string;
  num_scraping: number;

  constructor(props: IScrapingEntityProps) {
    Object.assign(this, props);

    if (!this._id) {
      this._id = v4();
    }

    const data = validator.validate(NewsSchemaValidator, { ...this });

    if (data.success === false) {
      throw new ValidationError("Zod validation errors", data);
    } else {
      Object.assign(this, data);
    }
  }
}
