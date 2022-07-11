import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface AppState {
  test?: string
  user?: IUser
  jwtToken?: string
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
  personalData: IPersonalData
}

const initialState: AppState = {
  user: undefined,
  jwtToken: undefined,
}

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<{user: IUser, jwtToken: string}>) => {
      state.jwtToken = action.payload.jwtToken
      state.user = action.payload.user
    }
  },
})

export const { setAuthUser } = AppSlice.actions

export const selectTest = (state: RootState) => state.app.test

export default AppSlice.reducer
