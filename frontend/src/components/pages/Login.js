import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

import '../../styles/Login.css' // Import the CSS file
import axios from "axios";

import { Container, TextField, Button, Typography, Grid, Box } from '@mui/material';





function Login() {

 
const theme = useTheme()
const [email, setEmail] = useState()
const [password, setPassword] = useState()
const navigate = useNavigate()
console.log(email, password)
const handleLogin = (e) => {
  e.preventDefault()
  const data = {email , password}
  axios.post('http://localhost:8000/api/auth/login', data)
  .then((res) => {
    const token = res.data.token
    localStorage.setItem('token', token)
    navigate('/dashboard')

  })
  .catch(() => {
    console.log('error logging in')
  })
}

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
       
      
        <Container
        maxWidth="sm" 
        sx={{
          backgroundColor: theme.palette.primary.light,
          padding: 4, 
          borderRadius: 2,
          boxShadow: 3, 
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom  className="title">
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    placeholder="email"
                    fullWidth
                    label="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{ style: { color: 'white' } }} 
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Password"
                    fullWidth
                    label="Password"
                    color="secondary"
                    type="password"
                    variant="filled"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{ style: { color: 'white' , borderColor:'red'} }} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' color="secondary" fullWidth sx={{
                  backgroundColor: theme.palette.income.main,
                  color: theme.palette.secondary.main
            }} >
              Create  Account
            </Button>
          </Grid>
        </Grid>
      </Container>
      </Box>
    )
}


export default Login