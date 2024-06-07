import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/Login.css' // Import the CSS file
import axios from "axios";

import { Container, TextField, Button, Typography, Grid } from '@mui/material';





function Login() {

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
    navigate('/transactions')

  })
  .catch(() => {
    console.log('error logging in')
  })
}

    return (
        <Container maxWidth="xs" className="container">
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
            <Button variant='contained' color="secondary" fullWidth >
              Register
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
}


export default Login