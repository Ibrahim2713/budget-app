import React, { useState } from 'react';
import { ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, Typography } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <ProSidebarProvider>
      <Box style={{ display: 'flex', height: '100vh' }}>
        <Sidebar collapsed={isCollapsed}>
        <img
                  src="https://via.placeholder.com/100"
                  alt="User"
                  width="100px"
                  height="100px"
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
          <Menu>
            <MenuItem
              icon={<DashboardOutlinedIcon />}
              active={selected === 'Dashboard'}
              onClick={() => setSelected('Dashboard')}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              icon={<BarChartOutlinedIcon />}
              active={selected === 'Bar Chart'}
              onClick={() => setSelected('Bar Chart')}
            >
              Bar Chart
            </MenuItem>
            <MenuItem
              icon={<LoginIcon />}
              active={selected === 'Login'}
              onClick={() => setSelected('Login')}
            >
              Login
            </MenuItem>
            <MenuItem
              icon={<LogoutIcon />}
              active={selected === 'Logout'}
              onClick={() => setSelected('Logout')}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>

        <Box flex={1} p="20px">
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuIcon />
          </IconButton>

       



             
        </Box>
      </Box>
    </ProSidebarProvider>
  );
}

export default App;
