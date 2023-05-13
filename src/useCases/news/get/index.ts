import { MongoDBNewsRepository } from '../../../repositories/implementations/MongoDB/mongoDBNewsRepository'
import { GetUseCase } from './getUseCase'
import { GetController } from './getController'

const mongoDBNewsRepository = new MongoDBNewsRepository()
const getUseCase = new GetUseCase(mongoDBNewsRepository)
const getController = new GetController(getUseCase)

export { getUseCase, getController }
