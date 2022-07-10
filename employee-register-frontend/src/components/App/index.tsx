import React, { useState } from 'react'
import { useAppSelector } from '@app/hooks'
import SignIn from '@app/components/SignIn'
import { selectTest } from '@app/features/app/appSlice'
import './index.scss'

export const App = () => {
  const mode = useAppSelector(selectTest)
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e)
  }
  return (
  <>
    <SignIn />
  </>
  )
}