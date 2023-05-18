import { MongoDBNewsRepository } from "../../../repositories/implementations/MongoDB/mongoDBNewsRepository";
import { CreateUseCase } from "./createUseCase";
import { CreateController } from "./createController";

const mongoDBNewsRepository = new MongoDBNewsRepository();
const createUseCase = new CreateUseCase(mongoDBNewsRepository);
const createController = new CreateController(createUseCase);

export { createUseCase, createController };
