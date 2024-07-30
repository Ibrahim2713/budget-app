import React, {useEffect, useContext} from 'react'
import { DataContext } from '../state/Datacontext';
import { Box, Typography, Button, useTheme, TextField } from '@mui/material'
import { fetchIncome,fetchExpenses,fetchSavings, setSelectedDate } from '../state/actionCreators';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Sidebar/Sidebar"
import { formatDataByMonth } from '../analytics/utils/formatData'
import ComparativeLineChart from '../analytics/charts/ComparativeLineChart'


function NewAnalytics() {
const theme = useTheme();
const token = localStorage.getItem("token");

const {
  income,
  expenses,
  savings,
  selectedDate,
  setSelectedDate,
} = useContext(DataContext);







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



export default NewAnalytics;