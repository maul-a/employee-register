import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@app/hooks'
import UserTable from '@app/components/UserTable'
import { selectUser } from '@app/features/app/appSlice'
import './index.scss'

export const App = () => {
  const user = useAppSelector(selectUser)
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e)
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