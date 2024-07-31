import React, { useState, useContext } from "react";
import {
  Box,
  InputAdornment,
  TextField,
  IconButton,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { DataContext } from "../../state/Datacontext";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import ComparativeLineChart from "../../analytics/charts/ComparativeLineChart"

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
    filteredSavings
  } = useContext(DataContext);


  const handleChange = (event) => {
   
  };

  const handleSearch = () => {
    // Add search functionality here
  };

  const handleCategoryChange = (category) => {

  };

  return (
    <Box m="1.5rem 2.5" sx={{ backgroundColor: theme.palette.primary.main }}>
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
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
      >
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.primary.main}
          borderRadius="0.55rem"
        >
          <ComparativeLineChart incomeData={filteredIncome} expenseData={filteredExpenses} />
        </Box>
      </Box>
    </Box>
  );
}

/* <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Sidebar />

      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={3}
        style={{ marginTop: "20px" }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
            InputProps={{
              style: { backgroundColor: "white", color: "black" },
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
                views={["year", "month"]}
                label="Select Month"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>
        <Grid item display="flex" justifyContent="space-between">
          <Button
            className="income-button"
            onClick={() => handleCategoryChange("income")}
            sx={{
              backgroundColor: theme.palette.income.main,
            }}
          >
            Income
          </Button>
          <Button
            variant="contained"
            className="savings-button"
            onClick={() => handleCategoryChange("savings")}
            sx={{
              backgroundColor: theme.palette.savings.main,
            }}
          >
            Savings
          </Button>
          <Button
            variant="contained"
            className="expenses-button"
            onClick={() => handleCategoryChange("expenses")}
            sx={{
              backgroundColor: theme.palette.expenses.main,
            }}
          >
            Expenses
          </Button>
        </Grid>
        <Grid item xs={12} sm={11} md={10} lg={8}>
          {selectedCategory === "income" && <IncomeAnalytics />}
          {selectedCategory === "savings" && <SavingsAnalytics />}
          {selectedCategory === "expenses" && <ExpensesAnalytics />}
        </Grid>
      </Grid>
    </Box> */

export default Analytics;
