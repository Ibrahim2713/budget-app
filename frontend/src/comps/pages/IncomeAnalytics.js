import React, {useState}from 'react'
import IncomeLineGraph from '../../common/Analytics/IncomeLineGraph';
import { Typography, Drawer, Divider, List, ListItemButton, ListItem, ListItemIcon, ListItemText , Box, InputAdornment, TextField, IconButton, Grid} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';

function IncomeAnalytics() {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState();

    const handleChange = () => {

    }
    const handleSearch = () => {

    }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Analytics', icon: <AnalyticsIcon /> },
    { text: 'Account', icon: <AccountCircleIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Log Out', icon: <ExitToAppIcon /> }

  ]
  return (
    <>
    <Box>
     <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
</Box>
<Box>
    <Drawer  
    variant="persistent"
        anchor="left"
        open={open}>
        <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <List>
            {menuItems.map((item,index) => (
                <ListItem key={item.text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                           {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Drawer>
    </Box>
    <Grid container justifyContent="center" style={{marginTop: '10px'}}>
        <Grid item xs={12} sm={8} md={6}>
            <Box display="flex" justifyContent="center">
      <TextField 
      variant='outlined'
      placeholder='Search'
      value={searchTerm}
      onChange={handleChange}
      inputProps={{
        endAdornmnet: (
            <InputAdornment position='end'>
                <IconButton onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
            </InputAdornment>
        )
      }}
      fullWidth
      sx={{ maxWidth: '500px' }}
      />
        </Box>
      </Grid>
    </Grid>
    <Grid container justifyContent="center" style={{ marginTop: '20px'}}>
        <Grid item xs={12} sm={8} md={6}>
            <Box display="flex" justifyContent="center">
              
            <IncomeLineGraph />
            </Box>
        </Grid>
    </Grid>
    </>
  )
}

export default IncomeAnalytics