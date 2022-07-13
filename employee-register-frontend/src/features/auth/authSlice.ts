import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";
import { RootState } from '@app/store'


interface AuthState {
  user?: IUser
  jwtToken?: string
  initialised: boolean
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
  personalData: IPersonalData
}

const initialState: AuthState = {
  user: undefined,
  jwtToken: undefined,
  initialised: false,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitialised: (state: AuthState) => {
      state.initialised = true
    },
    setAuthData: (state: AuthState, action: PayloadAction<{user: IUser, jwtToken: string}>) => {
      state.jwtToken = action.payload.jwtToken
      state.user = action.payload.user
      state.initialised = true
      localStorage.setItem('jwtToken', action.payload.jwtToken)
    },
    logOutUser: (state: AuthState) => {
      state.user = undefined
      state.jwtToken = undefined
    }
  },
})

export const { setAuthData, logOutUser, setInitialised } = AuthSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const selectInitialisedStatus = (state: RootState) => state.auth.initialised
export const selectJwtToken = (state: RootState) => state.auth.jwtToken


export default AuthSlice.reducer
