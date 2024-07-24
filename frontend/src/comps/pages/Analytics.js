import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setSelectedDate, setSelectedCategory } from '../../state/actionCreators';
import {

  Box,
  InputAdornment,
  TextField,
  IconButton,
  Grid,
  Button,
  Paper,} from '@mui/material';
import '../../styles/Analytics.css'
import { useTheme } from '@emotion/react';
import Sidebar from '../Sidebar'
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import IncomeAnalytics from '../../common/Income/IncomeAnalytics';
import SavingsAnalytics from '../../common/Savings/SavingsAnalytics';
import ExpensesAnalytics from '../../common/Expenses/ExpensesAnalytics';

function Analytics({ setSelectedDate, selectedDate, selectedCategory, setSelectedCategory }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme()


  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    // Add search functionality here
  };
 

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


 
  return (
   
      <Box   sx={{
        backgroundColor: theme.palette.primary.main,
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Sidebar />
    

      
      <Grid container direction="column" alignItems="center" spacing={3} style={{ marginTop: '20px' }} s>
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
        <Grid item display="flex" justifyContent="space-between">
          <Button  className="income-button"onClick={() => handleCategoryChange('income')} sx={{
            backgroundColor: theme.palette.income.main
          }}>
            Income
          </Button>
          <Button variant="contained" className="savings-button" onClick={() => handleCategoryChange('savings')} sx={{
            backgroundColor: theme.palette.savings.main
          }}>
            Savings
          </Button>
          <Button variant="contained" className="expenses-button" onClick={() => handleCategoryChange('expenses')} sx={{
            backgroundColor: theme.palette.expenses.main
          }}>
            Expenses
          </Button>
        </Grid>
        <Grid item xs={12} sm={11} md={10} lg={8}>
          {selectedCategory === 'income' && <IncomeAnalytics />}
          {selectedCategory === 'savings' && <SavingsAnalytics />}
          {selectedCategory === 'expenses' && <ExpensesAnalytics />}
        </Grid>
      </Grid>
      </Box>

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