import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme} from "@emotion/react";
import loginBackground from '../../assets/images/flatlay-of-coffee-and-computer-on-wooden-surface.jpg';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';



function Register() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate();

  

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { email, password, first_name: firstName, last_name: lastName };
    axios.post('http://localhost:8000/api/auth/register', data)
      .then((res) => {
        navigate('/login');
      })
      .catch(() => {
        console.log('error logging in');
      });
  };

  return (
    <>
      {/* Global CSS reset */}
     
      <Box sx={{ minHeight: "100vh", margin: 0, padding: 0, display: "flex", position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${loginBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,  // Ensure the background is beneath the container
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,  // Ensure the container is above the background
            position: "relative",  // Position relative to allow centering
            width: "100%",
            height: "100vh",  // Ensure the container covers the viewport height
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              backgroundColor: theme.palette.background.paper,
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              minHeight: '75vh',
              position: "relative", // Ensure container is on top of the background
              zIndex: 1,
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" gutterBottom fontWeight="lighter">
                Welcome back!
              </Typography>
              <Typography variant="subtitle1" gutterBottom fontWeight="lighter">
                Take control of your finances
              </Typography>
            </Box>
            <form onSubmit={handleLogin}>
            <Box sx={{ mb: 2 }}>
                <TextField
                  placeholder="First name"
                  fullWidth
                  label="First name"
                  variant="standard"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{ backgroundColor: "white" }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  placeholder="Last name"
                  fullWidth
                  label="Last name"
                  variant="standard"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{ backgroundColor: "white" }}
                />
              </Box>



              <Box sx={{ mb: 2 }}>
                <TextField
                  placeholder="Email"
                  fullWidth
                  label="Email"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ backgroundColor: "white" }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  placeholder="Password"
                  fullWidth
                  label="Password"
                  color="secondary"
                  type="password"
                  variant="standard"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ backgroundColor: "white" }}
                />
              </Box>
              <Box sx={{ mt: 5, mb: 5 }}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ backgroundColor: "black", color: theme.palette.text.main }}
                >
                  Register
                </Button>
              </Box>
            </form>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={1}>
              <Typography variant="subtitle1" gutterBottom fontWeight="lighter">
                Already have an account{' '}
                <Link href="/login" color="inherit" underline="hover">
                  Login
                </Link>
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Register;
