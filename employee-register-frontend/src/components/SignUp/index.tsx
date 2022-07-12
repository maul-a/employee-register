import * as React from 'react'
import { useNavigate, Link as ReactRouterLink } from "react-router-dom"

import { Avatar, Box, Container, CssBaseline, Grid, Link, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import countries from '@app/json/countries.json'
import SignUpForm from './SignUpForm'

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
    const response = await fetch('/api/v1/employee/me', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.get('username'),
        password: data.get('password'),
        email: data.get('email'),
        personalData: {
          role: data.get('role'),
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          address: {
            street: data.get('street'),
            streetNr: data.get('streetNr'),
            place: data.get('place'),
            ZIP: data.get('ZIP'),
            country: country ? country.code : null,
          }
        }
      })
    })
    const json = await response.json()
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
