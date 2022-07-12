import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, CssBaseline, Box, Typography } from '@mui/material'

import SignUpForm from '@app/components/SignUp/SignUpForm'
import { createEmployee } from '@app/features/employees/employeesRequests'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { addToEmployeeList, IEmployee } from '@app/features/employees/employeesSlice'
import { selectJwtToken } from '@app/features/auth/authSlice'
import countries from '@app/json/countries.json'

export default function AddNewEmployee() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const jwtToken = useAppSelector(selectJwtToken)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();    
    const data = new FormData(event.currentTarget);
    const countryName = data.get('country')
    const country = countries.find(currentCountry => currentCountry.name === countryName)

    const employee: Omit<IEmployee, 'id'> = {
      role: data.get('role')!.toString(),
      firstName: data.get('firstName')!.toString(),
      lastName: data.get('lastName')!.toString(),
      address: {
        street: data.get('street')!.toString(),
        streetNr: data.get('streetNr')!.toString(),
        place: data.get('place')!.toString(),
        ZIP: data.get('ZIP')!.toString(),
        country: country ? country.code : '',
      }
    }
    const { response } = await createEmployee(jwtToken!, employee)
    if (response) {
      dispatch(addToEmployeeList([response]))
      navigate('/')
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
          <Typography component="h1" variant="h5">
            Add a new employee
          </Typography>

      <SignUpForm 
        handleSubmit={handleSubmit}
        submitButtonText="Add New Employee"
      />
      </Box>
    </Container>
  )
}