import { model, Schema, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  username: string
  hash: string
  salt: string
}

export const UserSchema = new Schema({
  email: { type: String, unique: true, sparse: true },
  username: { type: String, unique: true, sparse: true },
  hash: String,
  salt: String,
})

const User = model<IUser>('user', UserSchema)
export default User
