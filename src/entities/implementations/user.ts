import { validator } from '../validations/Validator'
import { IUserEntityProps } from '../interfaces/iUserEntityProps'
import { UserSchemaValidator } from '../validations/userSchemaValidator'
import { ValidationError } from '../../errors/validationError'
import { v4 } from 'uuid'
import { hash, compare } from 'bcrypt'
export class UserEntity {
  _id: string
  name: string
  email: string
  password: string
  role: string

  constructor (props: IUserEntityProps) {
    Object.assign(this, props)

    if (!this._id) {
      this._id = v4()
    }

    const data = validator.validate(UserSchemaValidator, { ...this })

    if (data.success === false) {
      throw new ValidationError('Zod validation errors', data)
    } else {
      Object.assign(this, data)
    }
  }

  async encryptPassword () {
    return await hash(this.password, 12)
  }

  async comparePassword (passToCompare: string) {
    return await compare(passToCompare, this.password)
  }
}
