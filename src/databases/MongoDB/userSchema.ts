import { Schema, model, Document } from 'mongoose'

interface IUserSchema extends Document {
  _id: Schema.Types.Mixed,
  name: string,
  email: string,
  password: string
}

const UserSchema = new Schema({
  _id: Schema.Types.Mixed,
  name: String,
  email: String,
  password: String
})

export default model<IUserSchema>('User', UserSchema)
