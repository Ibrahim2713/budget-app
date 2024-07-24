import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setSelectedDate, setSelectedCategory } from '../../state/actionCreators';
import {
  Drawer,
  Divider,
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  InputAdornment,
  TextField,
  IconButton,
  Grid,
  Button,
  Paper,
  CircularProgress,
  Typography
} from '@mui/material';
import '../../styles/Analytics.css'
import { GreenButton,PinkButton,RedButton } from '../../styles/MuiTheme';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import IncomeAnalytics from '../../common/Income/IncomeAnalytics';
import SavingsAnalytics from '../../common/Savings/SavingsAnalytics';
import ExpensesAnalytics from '../../common/Expenses/ExpensesAnalytics';

function Analytics({ setSelectedDate, selectedDate, selectedCategory, setSelectedCategory }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    // Add search functionality here
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon className="white-icon" /> },
    { text: 'Analytics', icon: <AnalyticsIcon className="white-icon" /> },
    { text: 'Account', icon: <AccountCircleIcon className="white-icon" /> },
    { text: 'Settings', icon: <SettingsIcon className="white-icon" /> },
    { text: 'Log Out', icon: <ExitToAppIcon className="white-icon" /> },
  ];
  return (
    <div className="analytics-container">
      <Box>
        <IconButton
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ ...(open && { display: 'none' }) }}
          className="white-icon"
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer variant="persistent" anchor="left" open={open}  sx={{
    '& .MuiDrawer-paper': {
      backgroundColor: 'black',
      color: 'white',
    },
  }}>
        <IconButton onClick={handleDrawerClose} className="black-icon">
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Grid container direction="column" alignItems="center" spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
            InputProps={{
              style: { backgroundColor: 'white', color: 'black' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch} className="white-icon">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <Paper>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={['year', 'month']}
                label="Select Month"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} helperText={null} />}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>
        <Grid item>
          <GreenButton  className="income-button"onClick={() => handleCategoryChange('income')}>
            Income
          </GreenButton>
          <PinkButton variant="contained" className="savings-button" onClick={() => handleCategoryChange('savings')}>
            Savings
          </PinkButton>
          <RedButton variant="contained" className="expenses-button" onClick={() => handleCategoryChange('expenses')}>
            Expenses
          </RedButton>
        </Grid>
        <Grid item xs={12} sm={11} md={10} lg={8}>
          {selectedCategory === 'income' && <IncomeAnalytics />}
          {selectedCategory === 'savings' && <SavingsAnalytics />}
          {selectedCategory === 'expenses' && <ExpensesAnalytics />}
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedDate: state.date.selectedDate,
  selectedCategory: state.dateCategory.category,
});

const mapDispatchToProps = {
  setSelectedDate,
  setSelectedCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
