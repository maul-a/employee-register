import { model, Schema, Document } from 'mongoose'
import { IEmployee } from './Employee'

export interface IComment extends Document {
  text: string
  date: Date
  author: IEmployee
  employee: IEmployee
}

export const CommentSchema = new Schema({
  text: String,
  date: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'employee',
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'employee',
  },
})

const Comment = model<IComment>('comment', CommentSchema)
export default Comment
