import { model, Schema, Document } from 'mongoose'
import { IEmployee, EmployeeSchema } from '@app/models/Employee'

export interface IUser extends Document {
  email: string
  username: string
  hash: string
  salt: string
  personalData: IEmployee
}

export const UserSchema = new Schema({
  email: String,
  username: String,
  hash: String,
  salt: String,
  personalData: EmployeeSchema,
})

const User = model<IUser>('user', UserSchema)
export default User
