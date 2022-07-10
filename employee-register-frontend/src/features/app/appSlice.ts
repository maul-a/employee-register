import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface AppState {
    test?: string
}

const initialState: AppState = {
  
}

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<string>) => {
      state.test = action.payload
    }
  },
})

export const { setTest } = AppSlice.actions

export const selectTest = (state: RootState) => state.app.test

export default AppSlice.reducer
