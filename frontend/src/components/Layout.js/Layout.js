import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@emotion/react';

function Layout() {
const theme = useTheme()
  return (
    <Box display="flex" height="100vh" sx={{
        backgroundColor: theme.palette.primary.main
    }}>
      <Sidebar />
      <Box flex="1" ml={25} sx={{
        backgroundColor: theme.palette.primary.main,
        overflow: 'auto'
      }}> 
        <Navbar />
  
        {/* The Outlet component will render the nested route components */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
