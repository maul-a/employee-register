import React from "react"
import { Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Autocomplete, Button, Link } from "@mui/material"
import countries from '@app/json/countries.json'


interface IFields {
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  password?: string
  role?: string
  street?: string
  streetNr?: string
  ZIP?: string
  place?: string
  country?: string
}

interface SignUpFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    hasAuthData?: boolean
    footer?: React.ReactNode
    submitButtonText: string
    defaultValues?: IFields
  }

export default function SignUpForm({
    handleSubmit,
    hasAuthData = false,
    footer,
    submitButtonText,
    defaultValues = {}
  }: SignUpFormProps) {

    return (
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              defaultValue={defaultValues.firstName || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              defaultValue={defaultValues.lastName || ''}
            />
          </Grid>
          {hasAuthData && 
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              defaultValue={defaultValues.username || ''}
            />
          </Grid>}
          {hasAuthData &&
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              defaultValue={defaultValues.email || ''}
            />
          </Grid>
          }
          {hasAuthData &&
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              defaultValue={defaultValues.password || ''}
            />
          </Grid>
          }
          <Grid item xs={12}>
          <TextField
              required
              fullWidth
              name="role"
              label="Role"
              id="role"
              defaultValue={defaultValues.role || ''}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              autoComplete="address-line2"
              name="street"
              required
              fullWidth
              id="street"
              label="Street"
              autoFocus
              defaultValue={defaultValues.street || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="streetNr"
              label="Street Nr."
              name="streetNr"
              autoComplete="address-line2"
              defaultValue={defaultValues.streetNr || ''}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              autoComplete="postal-code"
              name="ZIP"
              required
              fullWidth
              id="ZIP"
              label="ZIP"
              defaultValue={defaultValues.ZIP || ''}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              required
              fullWidth
              id="place"
              label="Place"
              name="place"
              defaultValue={defaultValues.place || ''}
              autoComplete="address-level2"
            />
          </Grid>
          <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={countries.map(country => country.name)}
            defaultValue={defaultValues.country || ''}
            renderInput={(params) => (
              <TextField {...params} required label="Country" name="country" />
            )}
          />
          </Grid>

        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {submitButtonText}
        </Button>
        <Grid>
          {footer ? footer : ''}
        </Grid>
      </Box>
    )

   }