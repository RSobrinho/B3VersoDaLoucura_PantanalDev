import { UserEntity } from '../../../entities/implementations/user'
import { IUserRepository } from '../../../repositories/interfaces/iUserRepository'
import { IUserEntityProps } from '../../../entities/interfaces/iUserEntityProps'
import { NotFoundError } from '../../../errors/notFoundError'
export class GetUseCase {
  constructor (private userRepository: IUserRepository) {}

  async execute (userProps: IUserEntityProps): Promise<UserEntity> {
    const user = new UserEntity(userProps)
    if (!await this.userRepository.findByData(user)) {
      throw new NotFoundError('user')
    }
    return user
  }
}
