import React, { useState, useContext } from "react";
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { DataContext } from "../../state/Datacontext";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import CalendarPicker from "../CalanderPicker";
import StatBox from "../StatBox";
import IncomePieChart from "../../analytics/charts/IncomePieChart";
import RecentExpenses from "../RecentExpenses";
import IncomeGoalProgress from "../IncomeGoal";
import { DownloadOutlined, Paid } from "@mui/icons-material";
import ComparativeLineChart from "../../analytics/charts/ExpenseTrends";
import ExpensesPieChart from "../../analytics/charts/ExpensesPieChart"
import BreakdownChart from "../BreakdownChart";
import ComparativeBarChart from "../../analytics/charts/ComparativeBarchart";
import ExpenseLineChart from "../../analytics/charts/ExpenseTrends";

function Analytics() {
  const theme = useTheme();


  const {
    income,
    expenses,
    savings,
    selectedDate,
    setSelectedDate,
    selectedCategory,
    setSelectedCategory,
    filteredIncome,
    filteredExpenses,
    filteredSavings,
    searchTerm,
    setSearchTerm,
    incomeTotalsbyMonth,
    expenseTotalsbyMonth,
    savingsTotalsbyMonth,
    goals
  } = useContext(DataContext);
 



  const totalData = {
    Income: incomeTotalsbyMonth,
    Expenses: expenseTotalsbyMonth,
    Savings: savingsTotalsbyMonth,
  };

  return (
    <Box m="1.5rem 2.5" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Sidebar />

      <Box flex="1" ml="170px">
        <CalendarPicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="160px"
          gap="20px"
        >
         <Box 
         gridColumn="span 3"
         sx={{
          backgroundColor: theme.palette.text.main
          
         }}>
           <StatBox
            
              title="Total Networth"
              value={`$${totalData.Income.toFixed(2)}`}
              increase="+14%"
              description=""
              color={theme.palette.secondary.main}
              
              icon={
                <Paid
                  sx={{ color: theme.palette.secondary.main, fontSize: "26px" }}
                />
              }
              
            />
         </Box>
         <Box 
          gridColumn="span 3"
         sx={{
          backgroundColor: theme.palette.income.main
         }}>
            <StatBox
              title="Monthly Income"
              value={`$${totalData.Income.toFixed(2)}`}
              increase="+14%"
              description=""
              icon={
                <Paid
                  sx={{ color: theme.palette.secondary.main, fontSize: "26px" }}
                />
              }
            />
         </Box>
         <Box 
          gridColumn="1 / span 3"
         sx={{
          backgroundColor: theme.palette.primary.main
         }}>
             <Typography sx={{
            fontWeight:"600",
            color: theme.palette.text.main
          }}> Income Categories</Typography>
            <IncomePieChart  data={income}    sx={{
                width: "100%", // Full width of the parent Box
                height: "100%", // Full height of the parent Box
              }}/>
         </Box>
         <Box 
          gridColumn=" span 3"
         sx={{
          backgroundColor: theme.palette.secondary.main
         }}>
            <StatBox
              color={theme.palette.expenses.dark}
              title="Monthly Expenses"
              value={`$${totalData.Income.toFixed(2)}`}
              increase="+14%"
              description=""
              icon={
                <Paid
                  sx={{ color: theme.palette.secondary.main, fontSize: "26px" }}
                />
              }
            />
         </Box>
         <Box 
         gridRow="1 / span 2"
          gridColumn=" 7 / span 3"
         sx={{
          backgroundColor: theme.palette.primary.main
         }}>
            <RecentExpenses expenses={expenses}/>
         </Box>
         <Box 
         gridRow="1 / span 1"
          gridColumn=" 10 / span 6"
         sx={{
          backgroundColor: theme.palette.primary.main
         }}>
            <IncomeGoalProgress />
         </Box>
         <Box 
         gridRow="3 / span 2"
          gridColumn=" 1 / span 6"
         sx={{
          backgroundColor: theme.palette.primary.main
         }}>
          <Typography sx={{
            fontWeight:"600",
            color: theme.palette.text.main
          }}> Income Vs Expenses</Typography>
            <ComparativeBarChart incomeData={income} expensesData={expenses} />
         </Box>
         <Box 
         gridRow="3 / span 2"
          gridColumn=" 6 / span 3"
         sx={{
          backgroundColor: theme.palette.primary.main
         }}>
             <Typography sx={{
            fontWeight:"600",
            color: theme.palette.text.main
          }}> Expenses By Category</Typography>
            <ExpensesPieChart  data={expenses} sx={{
              width:"100%",
              height: "100%"
            }}/>
         </Box>

         <Box 
         gridRow="3 / span 2"
          gridColumn=" 10 / span 4"
         sx={{
          backgroundColor: theme.palette.primary.main
         }}>
         <ExpenseLineChart  expenseData={expenses}/>
         </Box>

         

          
          

        

         
        </Box>
      </Box>
    </Box>
  );
}

export default Analytics;
