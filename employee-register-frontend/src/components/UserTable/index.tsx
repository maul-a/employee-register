import React, { useEffect, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { IconButton, CircularProgress, Container, Button, ButtonGroup } from '@mui/material'
import { LockOpen } from '@mui/icons-material'
import { logOutUser, selectJwtToken, selectUser } from '@app/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { deleteEmployee, requestEmployeeList } from '@app/features/employees/employeesRequests'
import { deleteEmployeeFromList, selectEmployeeList, selectEmployeesLoadingStatus, setEmployeeList } from '@app/features/employees/employeesSlice'
import ImportFromCSV from './ImportFromCSV'
import DataTable from './UserTable'
import { Link, Navigate } from 'react-router-dom'
import DeletingDialog from './DeletingDialog'



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
    localStorage.removeItem('jwtToken')
    dispatch(logOutUser())
  }
  const employeeList = useSelector(selectEmployeeList)
  const loading = useSelector(selectEmployeesLoadingStatus)
  const user = useAppSelector(selectUser)
  const [employeeToDelete, setEmployeeToDelete] = useState<string|null>(null)
  const handleDelete = useCallback(async () => {
    if (!employeeToDelete) {
      return
    }
    const { response } = await deleteEmployee(jwtToken!, employeeToDelete)
    if (!response) {
      return
    }
    dispatch(deleteEmployeeFromList(response))
  }, [employeeToDelete])
  if (!user) {
    return <Navigate to="/sign-in" replace />
  }

  if (loading) {
    return <CircularProgress />
  }
  
  return (
    <Container sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
      <IconButton onClick={logOut}>
        <LockOpen />
      </IconButton>
      <DataTable
        list={employeeList} 
        setEmployeeToDelete={(id) => setEmployeeToDelete(id)}
      />
      <ButtonGroup sx={{ boxShadow: 0, marginTop: 3 }} variant="contained" aria-label="outlined primary button group">
        <ImportFromCSV />
        <Button sx={{ marginLeft: 10 }} variant="contained" component={Link} to="/add-new-employee">
          Add new employee
        </Button>
      </ButtonGroup>
      <DeletingDialog
        open={employeeToDelete !== null}
        handleClose={() => setEmployeeToDelete(null)}
        handleDelete={handleDelete}
      />
    </Container>
  );
}