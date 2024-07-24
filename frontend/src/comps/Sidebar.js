import React, { useState } from 'react';
import { Box, IconButton, Typography, Drawer, List, ListItemButton, ListItem, ListItemText, Divider, ListItemIcon} from '@mui/material';
import { useTheme } from '@emotion/react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

function App() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  const navigate = useNavigate()
  const theme = useTheme()

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon  />, link:'/dashboard' },
    { text: 'Analytics', icon: <AnalyticsIcon /> , link:'/analytics'},
    { text: 'Account', icon: <AccountCircleIcon  />},
    { text: 'Settings', icon: <SettingsIcon  /> },
    { text: 'Log Out', icon: <ExitToAppIcon  />},
  ];


const handleDrawerOpen = () => {
  setOpen(true);
};

const handleDrawerClose = () => {
  setOpen(false);
};


  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
   <>
     <Box
      sx={{
        width: 250,
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        overflowY: "auto",
      }}
    >
         <IconButton
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ 
            ...(open && { display: 'none' }), 
            color: theme.palette.secondary.main 
          }}
        >
          <MenuIcon />
        </IconButton>
     
        <Drawer variant="persistent" anchor="left" open={open} 
                 sx={{ 
                  '& .MuiDrawer-paper': { 
                    backgroundColor: theme.palette.primary.main, 
                    color: theme.palette.secondary.main, 
                  } 
                }}
        >
         
          <IconButton onClick={handleDrawerClose} className="black-icon">
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() =>  navigate(item.link)}>
              <ListItemIcon sx={{ color: theme.palette.secondary.main }}> {item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
          </Drawer>
          </Box>

    </>
  );
}

export default App;
