import { MongoDBScrapingRepository } from "../../../repositories/implementations/MongoDB/mongoDBScrapingRepository";
import { MongoDBNewsRepository } from "../../../repositories/implementations/MongoDB/mongoDBNewsRepository";
import { CreateUseCase } from "./createUseCase";
import { CreateController } from "./createController";

const mongoDBScrapingRepository = new MongoDBScrapingRepository();
const mongoDBNewsRepository = new MongoDBNewsRepository();
const createUseCase = new CreateUseCase(
  mongoDBScrapingRepository,
  mongoDBNewsRepository
);
const createController = new CreateController(createUseCase);

export { createUseCase, createController };
