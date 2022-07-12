import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IconButton, CircularProgress, Container } from '@mui/material'
import { LockOpen } from '@mui/icons-material'
import { logOutUser, selectJwtToken } from '@app/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { requestEmployeeList } from '@app/features/employees/employeesRequests'
import { selectEmployeeList, selectEmployeesLoadingStatus, setEmployeeList } from '@app/features/employees/employeesSlice'
import ImportFromCSV from './ImportFromCSV'
import DataTable from './UserTable'



export default function UserTable() {
  const jwtToken = useAppSelector(selectJwtToken)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (jwtToken) {
      requestEmployeeList(jwtToken)
      .then(({ response }) => response && dispatch(setEmployeeList(response)))
    }
  }, [])
  const logOut = () => {
    dispatch(logOutUser())
  }
  const employeeList = useSelector(selectEmployeeList)
  const loading = useSelector(selectEmployeesLoadingStatus)
  if (loading) {
    return <CircularProgress />
  }
  
  return (
    <Container sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
      <IconButton onClick={logOut}>
        <LockOpen />
      </IconButton>
      <DataTable list={employeeList} />
      <ImportFromCSV />
    </Container>
  );
}