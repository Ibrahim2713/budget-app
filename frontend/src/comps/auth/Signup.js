import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTheme } from "@emotion/react";
import { Container, TextField, Button, Typography, Grid, Box } from '@mui/material';


function Signup() {
  const theme = useTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  

  const handleSignup = (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    axios.post('http://localhost:8000/api/auth/register', data,)
      .then((res) => {
        navigate('/dashboard')
       
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Container maxWidth="sm" sx={{ padding: 4, borderRadius: 2, boxShadow: 3, backgroundColor: theme.palette.primary.light }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h4' align='center' gutterBottom sx={{
                color: theme.palette.secondary.main
            }}>
              Create Your Account!
            </Typography>
            <form onSubmit={handleSignup}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    placeholder='First Name'
                    fullWidth
                    label="First Name"
                    variant='outlined'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    InputLabelProps={{
                      style: { color: theme.palette.secondary.main }, // Label color
                    }}
                    inputProps={{
                      style: { color: theme.palette.secondary.main }, // Input text and placeholder color
                    }}
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder='Last Name'
                    fullWidth
                    label="Last Name"
                    variant='outlined'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    InputLabelProps={{
                      style: { color: theme.palette.secondary.main }, // Label color
                    }}
                    inputProps={{
                      style: { color: theme.palette.secondary.main }, // Input text and placeholder color
                    }}
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder='Email'
                    fullWidth
                    label="Email"
                    variant='outlined'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{
                      style: { color: theme.palette.secondary.main }, // Label color
                    }}
                    inputProps={{
                      style: { color: theme.palette.secondary.main }, // Input text and placeholder color
                    }}
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder='Password'
                    fullWidth
                    label="Password"
                    variant='outlined'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputLabelProps={{
                      style: { color: theme.palette.secondary.main }, // Label color
                    }}
                    inputProps={{
                      style: { color: theme.palette.secondary.main }, // Input text and placeholder color
                    }}
                    sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant='contained'
                    type='submit'
                    color='success'
                    sx={{ py: 1.5, backgroundColor: theme.palette.income.main }}
                  >
                    Create Your Account
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Signup;
