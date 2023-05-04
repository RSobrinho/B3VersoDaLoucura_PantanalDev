import { AlreadyOnBaseError } from '../../../errors/alreadyOnBaseError'
import { UserEntity } from '../../../entities/implementations/user'
import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
import { SignUpDTO } from './signUpDTO'
import { ValidationError } from '../../../errors/validationError'
export class SignUpUseCase {
  constructor (private userRepository: IUserRepository) {}

  async execute ({ name, email, password, confirmPassword }: SignUpDTO): Promise<UserEntity> {
    if (password !== confirmPassword) {
      throw new ValidationError('Password and confirmPassword are not the same')
    }

    const newUser = new UserEntity({ name, email, password })
    newUser.encryptPassword()
    if (await this.userRepository.findByData({ email })) {
      throw new AlreadyOnBaseError('email')
    } else {
      await this.userRepository.save(newUser)
    }

    return newUser
  }
}
