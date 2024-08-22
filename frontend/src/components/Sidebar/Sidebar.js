import React, { useState, useContext } from 'react';
import { DataContext } from '../../state/Datacontext';
import { Box, IconButton, Drawer, List, ListItemButton, ListItem, ListItemText, Divider, ListItemIcon} from '@mui/material';
import { useTheme } from '@emotion/react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const theme = useTheme()
  const { setAccessToken, setRefreshToken } = useContext(DataContext);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
    { text: 'Analytics', icon: <AnalyticsIcon />, link: '/analytics' },
    {text: 'Spreadsheet', icon: <MenuBookOutlinedIcon/>, link: '/spreadsheet'},
    {text: 'Calander', icon: <CalendarViewMonthIcon/>, link: '/calander'},
    { text: 'Log Out', icon: <ExitToAppIcon />, action: () => logout() },

  ];

const handleDrawerOpen = () => {
  setOpen(true);
};

const handleDrawerClose = () => {
  setOpen(false);
};
const logout = () => {




  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');


  setAccessToken(null);
  setRefreshToken(null);


  navigate('/login');
};


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
            color: theme.palette.secondary.light
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
         
          <IconButton onClick={handleDrawerClose} >
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
         <ListItemButton onClick={() => {
                  if (item.link) {
                    navigate(item.link);
                  } else if (item.action) {
                    item.action();
                  }
                }}>
              <ListItemIcon sx={{ color: theme.palette.secondary.light }}> {item.icon}</ListItemIcon>
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

export default Sidebar;
