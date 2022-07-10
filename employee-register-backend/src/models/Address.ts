import { model, Schema, Document } from 'mongoose'

export interface IAddress extends Document {
  street: string
  streetNr: string
  ZIP: string
  place: string
  country: string
}

export const AddressSchema = new Schema({
  street: String,
  streetNr: String,
  ZIP: String,
  place: String,
  country: String,
})

const Address = model<IAddress>('address', AddressSchema)
export default Address
