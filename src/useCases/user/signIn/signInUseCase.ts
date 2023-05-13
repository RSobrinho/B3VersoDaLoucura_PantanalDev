import { UserEntity } from '../../../entities/implementations/user'
import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
import { SignInDTO } from './signInDTO'
import { ValidationError } from '../../../errors/validationError'
import { compare } from 'bcrypt'
export class SignInUseCase {
  constructor (private userRepository: IUserRepository) {}

  async execute ({ email, password }: SignInDTO): Promise<void> {
    const _ = new UserEntity({ email, password })

    const existingUser = await this.userRepository.findByData({ email })

    if (!existingUser || await compare(password, existingUser.password)) {
      throw new ValidationError('Incorrect email or/and password')
    }
  }
}
