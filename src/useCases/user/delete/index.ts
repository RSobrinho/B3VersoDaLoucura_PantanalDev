import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { DeleteUseCase } from './deleteUseCase'
import { DeleteController } from './deleteController'

const mongoDBUserRepository = new MongoDBUserRepository()
const deleteUseCase = new DeleteUseCase(mongoDBUserRepository)
const deleteController = new DeleteController(deleteUseCase)

export { deleteUseCase, deleteController }
