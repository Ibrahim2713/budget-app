import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { DataContext } from "../../state/Datacontext";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import CalendarPicker from "../Dashboard/CalanderPicker";
import StatBox from "../Dashboard/StatBox";
import IncomePieChart from "../../analytics/charts/IncomePieChart";
import RecentExpenses from "../Dashboard/RecentExpenses";
import GoalProgress from "../Dashboard/GoalProgress";
import { Paid } from "@mui/icons-material";

import ExpensesPieChart from "../../analytics/charts/ExpensesPieChart";

import ExpenseTrends from "../../analytics/charts/ExpenseTrends";
import SavingsTrends from "../../analytics/charts/SavingsLineGraph";
import SavingsPieChart from "../../analytics/charts/SavingsPieChart";
function Analytics() {
  const theme = useTheme();

  const {
    income,
    expenses,
    savings,
    selectedDate,
    setSelectedDate,
    searchTerm,
    setSearchTerm,
    incomeTotalsbyMonth,
    expenseTotalsbyMonth,
    savingsTotalsbyMonth,
    netWorth,
    filteredIncome,
    filteredExpenses,
    filteredSavings,
  } = useContext(DataContext);

  console.log(savings);

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
              backgroundColor: theme.palette.text.main,
            }}
          >
            <StatBox
              title="Total Networth"
              value={`$${netWorth.toFixed(2)}`}
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
              backgroundColor: theme.palette.income.main,
            }}
          >
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
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <StatBox
              color={theme.palette.savings.dark}
              title="Monthly Savings"
              value={`$${totalData.Savings.toFixed(2)}`}
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
            gridColumn=" span 3"
            sx={{
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            <StatBox
              color={theme.palette.expenses.dark}
              title="Monthly Expenses"
              value={`$${totalData.Expenses.toFixed(2)}`}
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
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <RecentExpenses expenses={expenses} />
          </Box>
          <Box
            gridRow="1 / span 1"
            gridColumn=" 10 / span 6"
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <GoalProgress />
          </Box>
          <Box
            gridRow="3 / span 3"
            gridColumn=" 1 / span 5"
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                color: theme.palette.text.main,
              }}
            >
              {" "}
              Income Breakdown
            </Typography>
            <IncomePieChart
              filteredIncome={filteredIncome}
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
          <Box
            gridRow="3 / span 3"
            gridColumn=" 6 / span 4"
            sx={{
              backgroundColor: theme.palette.primary.main,
              overflow: "hidden", // Ensure contents do not overflow
              position: "relative",
              padding: "1rem",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                color: theme.palette.text.main,
              }}
            >
              {" "}
              Expenses Breakdown
            </Typography>
            <ExpensesPieChart
              filteredExpenses={filteredExpenses}
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>

          <Box
            gridRow="3 / span 2"
            gridColumn=" 10 / span 4"
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                color: theme.palette.text.main,
              }}
            >
              {" "}
              Savings Breakdown
            </Typography>
            <SavingsPieChart
              filteredSavings={filteredSavings}
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
          <Box
            gridColumn="1 / span 6"
            gridRow="5 / span 3"
            sx={{
              backgroundColor: theme.palette.primary.main,
              padding: "1rem",
              position: "relative", // Ensure proper stacking context
              zIndex: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                color: theme.palette.text.main,
                mb: 1,
              }}
            >
              {" "}
              Savings Trends
            </Typography>
            <SavingsTrends savingsData={savings} />
          </Box>
          <Box
            gridColumn="7 / span 6"
            gridRow="5 / span 3"
            sx={{
              backgroundColor: theme.palette.primary.main,
              padding: "1rem",
              position: "relative",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                color: theme.palette.text.main,
                mb: 1,
              }}
            >
              {" "}
              Expenses Trends
            </Typography>
            <ExpenseTrends expenseData={expenses} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Analytics;
