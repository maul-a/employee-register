import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@app/store'
import { IEmployee } from '../employees/employeesSlice'


interface CommentsState {
  commentList: IComment[]
  loading: boolean
}

export interface IComment {
  id: string
  text: string
  date: Date
  author: IEmployee
}

const initialState: CommentsState = {
  commentList: [],
  loading: true,
}

export const CommentsSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setCommentList: (state: CommentsState, action: PayloadAction<IComment[]>) => {
      state.commentList = action.payload
      state.loading = false
    },
    setInitialValue: (state: CommentsState) => {
      state.loading = false
      state.commentList = []
    },
    addToCommentList: (state: CommentsState, action: PayloadAction<IComment>) => {
      state.commentList = [
        ...state.commentList.map(comment => ({
          ...comment,
          author: {
            ...comment.author,
            address: {
              ...comment.author.address,
            }
          }
        })),
        action.payload,
      ]
    }
  },
})

export const { 
  setCommentList,
  setInitialValue,
  addToCommentList,
 } = CommentsSlice.actions

export const selectCommentList = (state: RootState) => state.comments.commentList
export const selectCommentsLoadingStatus = (state: RootState) => state.comments.loading

export default CommentsSlice.reducer