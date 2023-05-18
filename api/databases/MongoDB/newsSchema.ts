import { Schema, model, Document } from "mongoose";

interface INewsSchema extends Document {
  _id: Schema.Types.Mixed;
  title: string;
  description: string;
  date: Date;
  link: string;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const NewsSchema = new Schema({
  _id: Schema.Types.Mixed,
  title: String,
  description: String,
  date: Date,
  link: String,
  sentiment: {
    positive: Number,
    neutral: Number,
    negative: Number,
  },
});

export default model<INewsSchema>("News", NewsSchema);
