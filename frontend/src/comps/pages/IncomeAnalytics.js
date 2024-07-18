import React, {useState, useEffect}from 'react'
import IncomeLineGraph from '../../common/Analytics/IncomeLineGraph';
import IncomePieChart from '../../common/Analytics/IncomePieChart';
import IncomeTable from '../../common/Analytics/IncomeTable';
import { connect } from 'react-redux';
import { fetchIncome } from '../../state/actionCreators';
import { Typography, Drawer, Divider, List, ListItemButton, ListItem, ListItemIcon, ListItemText , Box, InputAdornment, TextField, IconButton, Grid, Button} from '@mui/material';
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

function IncomeAnalytics({income, fetchIncome}) {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredIncome, setFilteredIncome] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const token = localStorage.getItem('token');


    console.log(income)

    useEffect(() => {
      if (token) {
        fetchIncome(token);
      }
    }, [token, fetchIncome]);

  useEffect(() => {
    const formattedData = formatDataByMonth(income, selectedDate);
    setFilteredIncome(formattedData)
  }, [income, selectedDate]);

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
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['year', 'month']}
            label="Select Month"
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Box display="flex" justifyContent="center">
            <IncomeLineGraph data={filteredIncome} />
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Box display="flex" justifyContent="center">
            <IncomePieChart data={filteredIncome} />
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{marginTop: '20px'}}>
        <Grid item xs={12} sm={8} ms={6} > 
          <Box display="flex" justifyContent="center">
            <IncomeTable data={filteredIncome} />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
const formatDataByMonth = (income, selectedDate) => {
  const filteredData = income.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.getMonth() === selectedDate.getMonth() && itemDate.getFullYear() === selectedDate.getFullYear();
  });

  return filteredData.map(item => ({
    date: new Date(item.date).toISOString().split('T')[0],
    amount: Math.floor(Number(item.amount)),
    source: item.source
  }));
};


const mapStateToProps = (state) => ({
  income: state.income.income,
});

const mapDispatchToProps = {
  fetchIncome,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeAnalytics)