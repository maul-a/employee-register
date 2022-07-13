import * as React from 'react'
import { useNavigate, Link as ReactRouterLink } from "react-router-dom"

import { Avatar, Box, Container, CssBaseline, Grid, Link, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import countries from '@app/json/countries.json'
import SignUpForm from './SignUpForm'
import { IEmployee } from '@app/features/employees/employeesSlice';
import { register } from '@app/features/auth/authRequests';

const Footer = (
  <Grid container>
    <Grid item>
      <ReactRouterLink to="/sign-in">
          <Link variant="body2">
          Already have an account? Sign in
          </Link>
      </ReactRouterLink>
    </Grid>
  </Grid>
)
export default function SignUpPage() {
  const navigate = useNavigate();

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
      },
      authData: {
        username: data.get('username')!.toString(),
        password: data.get('password')!.toString(),
        email: data.get('email')!.toString(),
      }
    }
    await register(employee)
    navigate('/sign-in')
  };

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        <SignUpForm 
          handleSubmit={handleSubmit} 
          footer={Footer}
          hasAuthData
          submitButtonText="Sign Up"
         />
      </Box>
    </Container>
  )
}
