import React, {useState, useEffect}from 'react'
import { connect } from 'react-redux';
import { setSelectedDate, setSelectedCategory} from '../../state/actionCreators';
import {  Drawer, Divider, List, ListItemButton, ListItem, ListItemIcon, ListItemText , Box, InputAdornment, TextField, IconButton, Grid, Button, Paper, ToggleButtonGroup, ToggleButton} from '@mui/material';
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

function Analytics({setSelectedDate, selectedDate, selectedCategory, setSelectedCategory }) {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(selectedDate)


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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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
          open={open}
        >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
          <Divider />
          <List>
            {menuItems.map((item, index) => (
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
      <Grid container justifyContent="center" style={{ marginTop: '10px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Box display="flex" justifyContent="center">
            <TextField
              variant='outlined'
              placeholder='Search'
              value={searchTerm}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
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
      <Grid container justifyContent="center" style={{ marginTop: '30px' }}>
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
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item>
          <Button variant="contained" onClick={() => handleCategoryChange('income')}>
            Income
          </Button>
          <Button variant="contained" onClick={() => handleCategoryChange('savings')}>
            Savings
          </Button>
          <Button variant="contained" onClick={() => handleCategoryChange('expenses')}>
            Expenses
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Box display="flex" justifyContent="center">
            {selectedCategory === 'income' && <IncomeAnalytics />}
            {selectedCategory === 'savings' && <SavingsAnalytics />}
            {selectedCategory === 'expenses' && <ExpensesAnalytics />}
          </Box>
        </Grid>
      </Grid>
    </>
  
  )
}



const mapStateToProps = (state) => ({
  selectedDate: state.date.selectedDate,
  selectedCategory: state.dateCategory.category
});

const mapDispatchToProps = {
  setSelectedDate,
  setSelectedCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics)