import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, CssBaseline, Box, Typography, CircularProgress } from '@mui/material'

import SignUpForm from '@app/components/SignUp/SignUpForm'
import { updateEmployee, requestEmployee } from '@app/features/employees/employeesRequests'
import { useAppSelector } from '@app/hooks'
import {  IEmployee } from '@app/features/employees/employeesSlice'
import { selectJwtToken } from '@app/features/auth/authSlice'
import countries from '@app/json/countries.json'

export default function EditEmployee() {
  const navigate = useNavigate()
  const jwtToken = useAppSelector(selectJwtToken)
  const { id } = useParams()
  const [employee, setEmployee] = useState<IEmployee|null>(null)
  useEffect(() => {
    if (!id) {
      return
    }
    requestEmployee(id)
      .then(({ response }) => {
        if (response) {
          return setEmployee(response)
        }
      })
  }, [])

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
    const { response } = await updateEmployee(jwtToken!, id!, employee)
    if (response) {
      navigate('/')
    }
  }
  const defaultValues = useMemo(() => ({
    firstName: employee && employee.firstName || '',
    lastName: employee && employee.lastName || '',
    role: employee && employee.role || '',
    ...(employee && employee.address),
    country: countries.find(currentCountry => employee && currentCountry.code === employee.address.country)?.name || '',
  }), [employee])
  if (!employee) {
    return <CircularProgress />
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
            Edit Employee
          </Typography>

      <SignUpForm 
        handleSubmit={handleSubmit}
        submitButtonText="Save"
        defaultValues={defaultValues}
      />
      </Box>
    </Container>
  )
}