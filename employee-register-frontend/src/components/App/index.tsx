import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

import { useAppDispatch, useAppSelector } from '@app/hooks'
import { selectInitialisedStatus, setAuthData, setInitialised } from '@app/features/auth/authSlice'
import { loadTokenFromLocalStorage } from '@app/features/auth/authRequests'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import UserTable from '../UserTable'

export const App = () => {
  const dispatch = useAppDispatch()
  const initialised = useAppSelector(selectInitialisedStatus)
  useEffect(() => {
    loadTokenFromLocalStorage().then((response) => {
      if (!response) {
        return dispatch(setInitialised())
      }
      dispatch(setAuthData(response))
    })
  }, [])
  if (!initialised) {
    return <CircularProgress />
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserTable />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
  )
}