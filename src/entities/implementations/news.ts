import { validator } from '../validations/Validator'
import { INewsEntityProps } from '../interfaces/iNewsEntityProps'
import { NewsSchemaValidator } from '../validations/newsSchemaValidator'
import { ValidationError } from '../../errors/validationError'
import { v4 } from 'uuid'
export class NewsEntity {
  _id: string
  title: string
  description: string
  date: string
  sentiment: {
    positive: number,
    neutral: number,
    negative: number
  }

  constructor (props: INewsEntityProps) {
    Object.assign(this, props)

    if (!this._id) {
      this._id = v4()
    }

    const data = validator.validate(NewsSchemaValidator, { ...this })

    if (data.success === false) {
      throw new ValidationError('Zod validation errors', data)
    } else {
      Object.assign(this, data)
    }
  }
}
