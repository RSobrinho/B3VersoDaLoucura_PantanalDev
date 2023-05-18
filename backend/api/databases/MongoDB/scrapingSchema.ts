import { Schema, model, Document } from "mongoose";

interface IScrapingSchema extends Document {
  _id: Schema.Types.Mixed;
  initial_date: Date;
  final_date: Date;
  updated_at: Date;
  num_scraping: number;
}

const ScrapingSchema = new Schema({
  _id: Schema.Types.Mixed,
  initial_date: Date,
  final_date: Date,
  updated_at: Date,
  num_scraping: Number,
});

export default model<IScrapingSchema>("Scraping", ScrapingSchema);
