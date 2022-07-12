import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

import { useAppDispatch, useAppSelector } from '@app/hooks'
import UserTable from '@app/components/UserTable'
import { selectInitialisedStatus, selectUser, setAuthData, setInitialised } from '@app/features/auth/authSlice'
import { loadTokenFromLocalStorage } from '@app/features/auth/authRequests'

export const App = () => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const initialised = useAppSelector(selectInitialisedStatus)
  useEffect(() => {
    loadTokenFromLocalStorage().then((response) => {
      if (!response) {
        return dispatch(setInitialised)
      }
      dispatch(setAuthData(response))
    })
  }, [])
  if (!initialised) {
    return <CircularProgress />
  }
  if (!user) {
    return <Navigate to="/sign-in" replace />
  }
  return (
  <>
    <UserTable />
  </>
  )
}