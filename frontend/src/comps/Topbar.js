import React from 'react'
import { Box, IconButton, useTheme } from '@mui/material'
import InputBase from '@mui/material/InputBase';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

function Topbar() {
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
            <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
            <NotificationsActiveOutlinedIcon />
        </IconButton>
        <IconButton>
            <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
            <DashboardOutlinedIcon />
        </IconButton>

    </Box>

    </Box>
   
  )
}

export default Topbar