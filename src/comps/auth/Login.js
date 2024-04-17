import React, {useState} from "react";
import '../../styles/Login.css' // Import the CSS file

import { Container, TextField, Button, Typography, Grid } from '@mui/material';



const handleLogin = (e) => {

}

function Login() {

const [username, setUsername] = useState()
const [password, setPassword] = useState()
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
                    placeholder="Username"
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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