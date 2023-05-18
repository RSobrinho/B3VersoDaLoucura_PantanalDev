import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { SignInUseCase } from './signInUseCase'
import { SignInController } from './signInController'

const mongoDBUserRepository = new MongoDBUserRepository()
const signInUseCase = new SignInUseCase(mongoDBUserRepository)
const signInController = new SignInController(signInUseCase)

export { signInUseCase, signInController }
