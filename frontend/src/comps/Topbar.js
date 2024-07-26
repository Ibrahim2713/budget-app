import React from 'react'
import { Box, IconButton, useTheme } from '@mui/material'
import InputBase from '@mui/material/InputBase';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';


function Topbar() {
    const theme = useTheme()

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
        
        <Box display="flex" borderRadius="3px">
    <InputBase sx={{ ml: 2, flex : 1}} placeholder="Search" />
        <IconButton type="button" sx={{p :1}} >
            <SearchOutlinedIcon />
        </IconButton>
   </Box>

    {/* Icons */}
    <Box display="flex">
        <IconButton>
            <SettingsOutlinedIcon  sx={{
                color: theme.palette.secondary.main
            }}/>
        </IconButton>
        <IconButton>
            <NotificationsActiveOutlinedIcon sx={{
                color: theme.palette.secondary.main
            }}/>
        </IconButton>
        <IconButton>
            <DashboardOutlinedIcon sx={{
                color: theme.palette.secondary.main
            }}/>
        </IconButton>

    </Box>

    </Box>
   
  )
}

export default Topbar