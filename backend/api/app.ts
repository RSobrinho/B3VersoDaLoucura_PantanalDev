import express from "express";
import ScrapingRouter from "./routes/scrapingRouter";
import NewsRouter from "./routes/newsRouter";
import mongoose from "mongoose";
import cors from "cors";
import { errorResponse } from "./errors/handler";
import { config } from "dotenv";

class App {
  public apiRoute = "/api/v1";
  public express: express.Application;

  public constructor() {
    config();

    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
    this.errorMiddlewares();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database() {
    let url = process.env.DATABASE_URL as string;
    url = url.replace("$username", process.env.USERNAME_DB);
    url = url.replace("$password", process.env.PASSWORD_DB);

    mongoose.set("strictQuery", false);
    mongoose.connect(url).then(() => console.log("DB connection established"));
  }

  private errorMiddlewares() {
    this.express.use(errorResponse);
  }

  private routes() {
    this.express.use(`${this.apiRoute}/news`, NewsRouter);
    this.express.use(`${this.apiRoute}/scraping`, ScrapingRouter);
  }
}

export default new App().express;
