import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@app/store'


interface AuthState {
  employeeList: IEmployee[]
  loading: boolean
}

export interface IEmployee {
  firstName: string
  lastName: string
  role: string
  address: IAddress
  authData?: IUser
}

export interface IAddress {
  street: string
  streetNr: string
  ZIP: string
  place: string
  country: string
}

export interface IPersonalData {
  firstName: string
  lastName: string
  role: string
  address: IAddress
}

export interface IUser {
  id: string
  email: string
  username: string
}

const initialState: AuthState = {
  employeeList: [],
  loading: true,
}

export const EmployeesSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployeeList: (state: AuthState, action: PayloadAction<IEmployee[]>) => {
      state.employeeList = action.payload
      state.loading = false
    },
    setLoadingStatus: (state: AuthState) => {
      state.loading = true
    },
    addToEmployeeList: (state: AuthState, action: PayloadAction<IEmployee[]>) => {
      state.employeeList = [
        ...state.employeeList.map(employee => ({
          ...employee,
          address: {...employee.address},
          authData: employee.authData ? {...employee.authData} : undefined,
      })),
       ...action.payload]
       state.loading = false
    }
  },
})

export const { setEmployeeList, setLoadingStatus, addToEmployeeList } = EmployeesSlice.actions

export const selectEmployeeList = (state: RootState) => state.employees.employeeList
export const selectEmployeesLoadingStatus = (state: RootState) => state.employees.loading

export default EmployeesSlice.reducer