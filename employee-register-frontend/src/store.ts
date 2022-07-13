import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@app/features/auth/authSlice'
import commentsSlice from '@app/features/comments/commentsSlice'
import employeesSlice from '@app/features/employees/employeesSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    employees: employeesSlice,
    comments: commentsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store