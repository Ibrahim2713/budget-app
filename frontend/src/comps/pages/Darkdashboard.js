import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setSelectedDate,
  setSelectedCategory,
} from "../../state/actionCreators";
import { useTheme } from "@emotion/react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { GreenButton, PinkButton, RedButton } from "../../styles/MuiTheme";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import {
  fetchIncome,
  fetchSavings,
  fetchExpenses,
} from "../../state/actionCreators";
import { formatDataByMonth } from "../../utils/formatData";
import IncomeLineGraph from "../../common/Analytics/Income/IncomeLineGraph";
import IncomePieChart from "../../common/Analytics/Income/IncomePieChart";
import IncomeTable from "../../common/Analytics/Income/IncomeTable";
import SavingsLineGraph from "../../common/Analytics/Savings/SavingsLineGraph";
import SavingsPieChart from "../../common/Analytics/Savings/SavingsPieChart";
import SavingsTable from "../../common/Analytics/Savings/SavingsTable";
import ExpensesLineGraph from "../../common/Analytics/Expenses/ExpensesLineGraph.js.js";
import ExpensesPieChart from "../../common/Analytics/Expenses/ExpensesPieChart";
import ExpenseTable from "../../common/Analytics/Expenses/ExpenseTable";

function Darkdashboard({
  selectedDate,
  setSelectedDate,
  fetchIncome,
  fetchSavings,
  fetchExpenses,
  income,
  savings,
  expenses,
}) {
    const theme = useTheme()
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchIncome(token);
    fetchSavings(token);
    fetchExpenses(token);
  }, [fetchIncome, fetchSavings, fetchExpenses, token]);

  const formattedIncomeData = formatDataByMonth(income, selectedDate);
  const formattedSavingsData = formatDataByMonth(savings, selectedDate);
  const formattedExpensesData = formatDataByMonth(expenses, selectedDate);

  return (
    <Box display="flex" flexDirection="column" height="100vh" sx={{ backgroundColor: theme.palette.primary.main }} >
      {/* Topbar */}
      <Box>
        <Topbar />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year", "month"]}
            label="Select Month"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => (
                <TextField
              {...params}
              helperText={null}
              sx={{
                '& .MuiInputBase-root': {
                  color: theme.palette.text.primary, // Text color
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.text.secondary, // Label color
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ffffff', // White border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#ffffff', // White border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff', // White border color when focused
                  },
                },
              }}
            />
            )}
          />
        </LocalizationProvider>
      </Box>

      <Box p="20px" display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" fontWeight="600" color={"white"} sx={{ color: theme.palette.secondary.main}}>
          Dashboard
        </Typography>

        {/* Buttons */}
        <Box display="flex" gap="10px" mb="20px">
          <Button sx={{ backgroundColor: theme.palette.income.main, color: theme.palette.secondary.main}}>Income</Button>
          <Button  sx={{ backgroundColor: theme.palette.savings.main, color: theme.palette.secondary.main}}>Savings</Button>
          <Button sx={{ backgroundColor: theme.palette.expenses.main, color: theme.palette.secondary.main}}>Expenses</Button>
        </Box>
      </Box>

      {/* Sidebar and Content */}
      <Box display="flex" flex="1">
        <Box>
          <Sidebar />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gridAutoRows="minmax(150px, auto)"
          gap="20px"
          flex="1"
          p={2}
          sx={{ backgroundColor: theme.palette.primary.main }}
        >
          {/* Row 1 (Income) */}
          <Box
            gridColumn="span 3"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Typography variant="h4" fontWeight="600" mb={2} sx={{ color: theme.palette.secondary.main}}>
              Income Data
            </Typography>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gridAutoRows="minmax(150px, auto)"
              gap="20px"
              width="100%"
            >
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Income Line Graph
                </Typography>
                <IncomeLineGraph data={formattedIncomeData} />
              </Box>
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Income Pie Chart
                </Typography>
                <IncomePieChart data={formattedIncomeData} />
              </Box>
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Income Table
                </Typography>
                <IncomeTable data={formattedIncomeData} />
              </Box>
            </Box>
          </Box>

          {/* Row 2 (Savings) */}
          <Box
            gridColumn="span 3"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Box
              mt="25px"
              p="0 30"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography variant="h4" fontWeight="600" sx={{ color: theme.palette.secondary.main}}>
                Savings Data
              </Typography>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gridAutoRows="minmax(150px, auto)"
              gap="20px"
              width="100%"
              mt={2}
            >
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Savings Line Graph
                </Typography>
                <SavingsLineGraph data={formattedSavingsData} />
              </Box>
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Savings Pie Chart
                </Typography>
                <SavingsPieChart data={formattedSavingsData} />
              </Box>
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Savings Table
                </Typography>
                <SavingsTable data={formattedSavingsData} />
              </Box>
            </Box>
          </Box>

          {/* Row 3 (Expenses) */}
          <Box
            gridColumn="span 3"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Box
              mt="25px"
              p="0 30"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography variant="h4" fontWeight="600" sx={{ color: theme.palette.secondary.main}}>
                Expenses Data
              </Typography>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gridAutoRows="minmax(150px, auto)"
              gap="20px"
              width="100%"
              mt={2}
            >
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Expenses Line Graph
                </Typography>
                <ExpensesLineGraph data={formattedExpensesData} />
              </Box>
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Expenses Pie Chart
                </Typography>
                <ExpensesPieChart data={formattedExpensesData} />
              </Box>
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Expenses Table
                </Typography>
                <ExpenseTable data={formattedExpensesData} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  selectedDate: state.date.selectedDate,
  selectedCategory: state.dateCategory.category,
  income: state.income.income,
  expenses: state.expense.expenses,
  savings: state.savings.savings,
});

const mapDispatchToProps = {
  setSelectedDate,
  setSelectedCategory,
  fetchIncome,
  fetchSavings,
  fetchExpenses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Darkdashboard);
