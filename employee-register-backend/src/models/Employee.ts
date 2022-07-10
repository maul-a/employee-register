import { model, Schema, Document } from 'mongoose'
import { IAddress, AddressSchema } from '@app/models/Address'

export interface IEmployee extends Document {
  firstName: string
  lastName: string
  role: string
  address: IAddress
}

export const EmployeeSchema = new Schema({
  firstName: String,
  lastName: String,
  role: String,
  address: AddressSchema,
})

const Employee = model<IEmployee>('employee', EmployeeSchema)
export default Employee
