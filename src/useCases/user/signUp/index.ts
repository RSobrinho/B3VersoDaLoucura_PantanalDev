import { MongoDBUserRepository } from '../../../repositories/implementations/MongoDB/mongoDBUserRepository'
import { SignUpUseCase } from './signUpUseCase'
import { SignUpController } from './signUpController'

const mongoDBUserRepository = new MongoDBUserRepository()
const signUpUseCase = new SignUpUseCase(mongoDBUserRepository)
const signUpController = new SignUpController(signUpUseCase)

export { signUpUseCase, signUpController }
