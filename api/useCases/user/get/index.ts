import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { GetUseCase } from './getUseCase'
import { GetController } from './getController'

const mongoDBUserRepository = new MongoDBUserRepository()
const getUseCase = new GetUseCase(mongoDBUserRepository)
const getController = new GetController(getUseCase)

export { getUseCase, getController }
