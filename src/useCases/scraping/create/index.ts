import { MongoDBScrapingRepository } from "../../../repositories/implementations/MongoDB/mongoDBScrapingRepository";
import { CreateUseCase } from "./createUseCase";
import { CreateController } from "./createController";

const mongoDBScrapingRepository = new MongoDBScrapingRepository();
const createUseCase = new CreateUseCase(mongoDBScrapingRepository);
const createController = new CreateController(createUseCase);

export { createUseCase, createController };
