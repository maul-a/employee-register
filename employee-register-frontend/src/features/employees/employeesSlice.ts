import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@app/store'


interface EmployeesState {
  employeeList: IEmployee[]
  loading: boolean
}

export interface IEmployee {
  id: string
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
  email: string
  username: string
  password?: string
}

const initialState: EmployeesState = {
  employeeList: [],
  loading: true,
}

export const EmployeesSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployeeList: (state: EmployeesState, action: PayloadAction<IEmployee[]>) => {
      state.employeeList = action.payload
      state.loading = false
    },
    setLoadingStatus: (state: EmployeesState) => {
      state.loading = true
    },
    deleteEmployeeFromList: (state: EmployeesState, action: PayloadAction<string>) => {
      state.employeeList = [
        ...state.employeeList
          .filter(employee => employee.id !== action.payload)
          .map(employee => ({
            ...employee,
            address: {...employee.address},
            authData: employee.authData ? {...employee.authData} : undefined,
        }))]
    },
    addToEmployeeList: (state: EmployeesState, action: PayloadAction<IEmployee[]>) => {
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

export const { 
  deleteEmployeeFromList, 
  setEmployeeList, 
  setLoadingStatus, 
  addToEmployeeList,
 } = EmployeesSlice.actions

export const selectEmployeeList = (state: RootState) => state.employees.employeeList
export const selectEmployeesLoadingStatus = (state: RootState) => state.employees.loading

export default EmployeesSlice.reducer