import { MongoDBNewsRepository } from "../../../repositories/implementations/MongoDB/mongoDBNewsRepository";
import { UpdateUseCase } from "./updateUseCase";
import { UpdateController } from "./updateController";

const mongoDBNewsRepository = new MongoDBNewsRepository();
const updateUseCase = new UpdateUseCase(mongoDBNewsRepository);
const updateController = new UpdateController(updateUseCase);

export { updateUseCase, updateController };
