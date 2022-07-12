import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import employeesSlice from './features/employees/employeesSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    employees: employeesSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store