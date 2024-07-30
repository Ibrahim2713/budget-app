import React from 'react'
import { Box, IconButton, useTheme, InputBase } from '@mui/material'
import {
    SearchOutlined,
    SettingsOutlined,
    AccountCircle,
    DashboardOutlined
  } from "@mui/icons-material";

function Navbar({searchTerm, setSearchTerm}) {
    const theme = useTheme()
  return (
   <Box display="flex" justifyContent="space-between" p={2}>
        
        <Box display="flex" borderRadius="3px">
        <InputBase
          sx={{ ml: 2, flex: 1, color: theme.palette.secondary.light, marginInline: 15 }}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton type="button" sx={{p :1}} >
            <SearchOutlined sx={{
                color: theme.palette.secondary.light
            }} />
        </IconButton>
   </Box>

   <Box display="flex">
        <IconButton>
            <SettingsOutlined  sx={{
                color: theme.palette.secondary.light
            }}/>
        </IconButton>
        <IconButton>
            <AccountCircle sx={{
                color: theme.palette.secondary.light
            }}/>
        </IconButton>
        <IconButton>
            <DashboardOutlined sx={{
                color: theme.palette.secondary.light
            }}/>
        </IconButton>

    </Box>
   </Box>

  )
}

export default Navbar