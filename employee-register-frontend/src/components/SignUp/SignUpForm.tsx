import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link as ReactRouterLink } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';


const theme = createTheme();

interface SignUpFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}
export default function SignUpForm({
  handleSubmit
}: SignUpFormProps) {

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
                  name="role"
                  required
                  defaultValue="Administrator"
                >
                  <MenuItem value="Administrator">Administrator</MenuItem>
                  <MenuItem value="Developer">Developer</MenuItem>
                  <MenuItem value="Salesperson">Salesperson</MenuItem>
                </Select>
              </FormControl>
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
                  autoComplete="address-level2"
                />
              </Grid>
              <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={['Germany', 'Kazakhstan']}
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <ReactRouterLink to="/sign-in">
                    <Link variant="body2">
                    Already have an account? Sign in
                    </Link>
                </ReactRouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
