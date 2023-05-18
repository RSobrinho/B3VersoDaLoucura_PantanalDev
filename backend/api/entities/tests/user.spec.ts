import { faker } from '@faker-js/faker'
import { UserEntity } from '../implementations/user'
import { describe, it, expect } from 'vitest'
import { IUserEntityProps } from '../interfaces/iUserEntityProps'

describe('UserEntity', () => {
  const validProps: IUserEntityProps = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(8)
  }

  it('should create a valid user', () => {
    const validUser = new UserEntity(validProps)

    expect(validUser).toBeInstanceOf(UserEntity)
  })

  it('should throw an error if at least 1 property is invalid', () => {
    const invalidUser = () => {
      return new UserEntity({
        ...validProps,
        email: 'rafa_sobrinhooutlook.com'
      })
    }

    expect(invalidUser).toThrowError()
  })
})
