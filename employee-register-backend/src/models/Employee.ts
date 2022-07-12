import { model, Schema, Document } from 'mongoose'
import { IAddress, AddressSchema } from '@app/models/Address'
import { IUser, UserSchema } from './User'
import { IComment } from './Comment'

export interface IEmployee extends Document {
  firstName: string
  lastName: string
  role: string
  address: IAddress
  authData: IUser
  comments: IComment[]
}

export const EmployeeSchema = new Schema({
  firstName: String,
  lastName: String,
  role: String,
  authData: { type: UserSchema, _id: false },
  address: { type: AddressSchema, _id: false },
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
})

const Employee = model<IEmployee>('employee', EmployeeSchema)
export default Employee
