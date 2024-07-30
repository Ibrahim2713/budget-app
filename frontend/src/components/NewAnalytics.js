import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { Box, Typography, Button, useTheme, TextField } from '@mui/material'
import { fetchIncome,fetchExpenses,fetchSavings, setSelectedDate } from '../state/actionCreators';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Sidebar/Sidebar"
import { formatDataByMonth } from '../analytics/utils/formatData'
import ComparativeLineChart from '../analytics/charts/ComparativeLineChart'


function NewAnalytics({income, expenses, savings,selectedDate, setSelectedDate, fetchIncome, fetchExpenses, fetchSavings}) {
const theme = useTheme();
const token = localStorage.getItem("token");




useEffect(() => {
    fetchIncome(token);
    fetchSavings(token);
    fetchExpenses(token);
  }, [fetchIncome, fetchSavings, fetchExpenses, token]);


  const filteredIncome = formatDataByMonth(income, selectedDate);
  const filteredExpenses = formatDataByMonth(expenses, selectedDate);
  const filteredSavings = formatDataByMonth(savings, selectedDate);




  




  return (
       <Box>
        <Navbar />
        <Sidebar />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
               sx={{
                backgroundColor: theme.palette.secondary.light,
              }}
                views={["year", "month"]}
                label="Select Month"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)"  gridAutoRows="160px"
            gap="20px">
        <Box   gridColumn="span 2"
      gridRow="span 1" >
                <ComparativeLineChart incomeData={filteredIncome} expenseData={filteredExpenses}  />
        </Box>
        
        </Box>


       </Box>
  )
}

const mapStateToProps = (state) => ({
    income: state.income.income,
    expenses: state.expense.expenses,
    savings: state.savings.savings,
    selectedDate: state.date.selectedDate,

  });
  
  const mapDispatchToProps = {
    fetchIncome,
    fetchSavings,
    fetchExpenses,
    setSelectedDate,
    
  };

export default connect(mapStateToProps, mapDispatchToProps)(NewAnalytics);