import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, useTheme, InputBase, Button } from '@mui/material';
import {
  SearchOutlined,
  SettingsOutlined,
  AccountCircle,
  DashboardOutlined
} from "@mui/icons-material";


function Navbar({ searchTerm, setSearchTerm }) {
const navigate = useNavigate()
  const theme = useTheme();

  const redirect = (link) => {
    navigate(link)
  }
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      <Box display="flex" alignItems="center" borderRadius="3px">
        <InputBase
          sx={{ ml: 2, flex: 1, color: theme.palette.secondary.light, marginInline: 15 }}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchOutlined sx={{ color: theme.palette.secondary.light }} />
        </IconButton>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.secondary.light,
            borderColor: theme.palette.secondary.light,
          }}
          onClick={() => redirect('/dashboard')}
        >
          Dashboard
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.secondary.light,
            borderColor: theme.palette.secondary.light,
          }}
          onClick={() => redirect('/spreadsheet')}
        >
          Spreadsheet
        </Button>
      </Box>

      <Box display="flex">
        <IconButton>
          <SettingsOutlined sx={{ color: theme.palette.secondary.light }} />
        </IconButton>
        <IconButton>
          <AccountCircle sx={{ color: theme.palette.secondary.light }} />
        </IconButton>
        <IconButton>
          <DashboardOutlined sx={{ color: theme.palette.secondary.light }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Navbar;
