import { MongoDBNewsRepository } from "../../../repositories/implementations/MongoDB/mongoDBNewsRepository";
import { DeleteUseCase } from "./deleteUseCase";
import { DeleteController } from "./deleteController";

const mongoDBNewsRepository = new MongoDBNewsRepository();
const deleteUseCase = new DeleteUseCase(mongoDBNewsRepository);
const deleteController = new DeleteController(deleteUseCase);

export { deleteUseCase, deleteController };
