import React, { useState,useContext } from "react";
import { DataContext } from "../../state/Datacontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme} from "@emotion/react";
import loginBackground from '../../assets/images/flatlay-of-coffee-and-computer-on-wooden-surface.jpg';
import { Container, TextField, Button, Typography, Box, Link} from '@mui/material';



function Login() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {
    setAccessToken,
    setRefreshToken
  } = useContext(DataContext);

  
    const handleLogin = async (e) => {
      e.preventDefault();
      const data = { email, password };
  
      try {
        const res = await axios.post('http://localhost:8000/api/auth/login', data, {
          withCredentials: true 
        });
        const { accessToken, refreshToken } = res.data;
        console.log({"this is the  access token": accessToken,
        "this is the refresh token": refreshToken
      })
  
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
  
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
  
        navigate('/dashboard');
      } catch (error) {
        console.log('Error logging in', error);
      }
    }

  return (
    <>
 
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
                  placeholder="email"
                  fullWidth
                  label="email"
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
                  Login
                </Button>
              </Box>
            </form>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={1}>
              <Typography variant="subtitle1" gutterBottom fontWeight="lighter">
                Don't have an account?{' '}
                <Link href="/register" color="inherit" underline="hover">
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Login;
