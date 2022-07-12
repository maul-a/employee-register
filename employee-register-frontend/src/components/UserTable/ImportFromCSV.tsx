import React from 'react'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import { importEmployeesFromCSV } from '@app/features/employees/employeesRequests'
import { setLoadingStatus, addToEmployeeList } from '@app/features/employees/employeesSlice'
import { selectJwtToken, } from '@app/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@app/hooks'

const Input = styled('input')({
  display: 'none',
})
export default function ImportFromCSV() {
  const jwtToken = useAppSelector(selectJwtToken)
  const dispatch = useAppDispatch()
  return (
    <label htmlFor="contained-button-file">
    <Input 
      accept="text/csv" 
      id="contained-button-file" 
      multiple 
      type="file" 
      onChange={async (e) => {
        const file = e.target?.files ? e.target?.files[0] : null
        if (file && jwtToken) {
          dispatch(setLoadingStatus())
          const { response } = await importEmployeesFromCSV(jwtToken, file)
          if (response) {
            dispatch(addToEmployeeList(response))
          }
        }
      }}
    />
    <Button variant="contained" component="span">
      Upload CSV
    </Button>
  </label>
)
}