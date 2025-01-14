import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { DataContext } from "../../state/Datacontext";
import CalendarPicker from "../Dashboard/CalanderPicker";
import StatBox from "../Dashboard/StatBox";
import IncomePieChart from "../../analytics/charts/IncomePieChart";
import RecentExpenses from "../Dashboard/RecentExpenses";
import { Paid } from "@mui/icons-material";
import CashFlowChart from "../../analytics/charts/CashFlowChart";
import ExpensesPieChart from "../../analytics/charts/ExpensesPieChart";
import ExpenseTrends from "../../analytics/charts/ExpenseTrends";
import SavingsTrends from "../../analytics/charts/SavingsLineGraph";
import SavingsPieChart from "../../analytics/charts/SavingsPieChart";
import IncomeTrends from "../../analytics/charts/IncomeLineGraph";

function Analytics() {
  const theme = useTheme();



  const {
    income,
    expenses,
    savings,
    selectedDate,
    setSelectedDate,
    incomeTotalsbyMonth,
    expenseTotalsbyMonth,
    savingsTotalsbyMonth,
    netWorth,
    filteredIncome,
    filteredExpenses,
    filteredSavings,
    incomeIncrease,
    expenseIncrease,
    savingsIncrease,
    netWorthIncrease,
  } = useContext(DataContext);

  const totalData = {
    Income: incomeTotalsbyMonth,
    Expenses: expenseTotalsbyMonth,
    Savings: savingsTotalsbyMonth,
  };

  return (
    <Box m="1.5rem 2.5" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Box flex="1">
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
              increase={`$${netWorthIncrease.toFixed(2)}%`}
              description="Increase from last month"
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
              increase={`+${incomeIncrease.toFixed(2)}%`}
              description="Increase from last month"
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
              increase={`+${savingsIncrease.toFixed(2)}%`}
              description="Increase from last month"
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
              increase={`+${expenseIncrease.toFixed(2)}%`}
              description="Increase from last month"
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
           <CashFlowChart />
          </Box>

          {/* Income PieChart */}
          <Box
            gridRow="3 / span 2"
            gridColumn=" 1 / span 4"
            mt={2}
            sx={{
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                color: theme.palette.text.main,
                mb: 1,
              }}
            >
              Income Breakdown
            </Typography>

            <IncomePieChart filteredIncome={filteredIncome} />
          </Box>

          {/* Expense PieChart */}
          <Box
            gridRow="3 / span 2"
            gridColumn=" 5 / span 4"
            mt={2}
            sx={{
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                color: theme.palette.text.main,
                mb: 1,
              }}
            >
              Expense Breakdown
            </Typography>

            <ExpensesPieChart filteredExpenses={filteredExpenses} />
          </Box>

          {/* Savings PieChart */}
          <Box
            gridRow="3 / span 2"
            gridColumn=" 9 / span 4"
            mt={2}
            sx={{
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                color: theme.palette.text.main,
                mb: 1,
              }}
            >
              Savings Breakdown
            </Typography>
            <SavingsPieChart filteredSavings={filteredSavings} />
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
              Expenses Trends
            </Typography>
            <ExpenseTrends expenseData={expenses} />
          </Box>
          <Box
            gridColumn="1 / span 12"
            gridRow="8 / span 3"
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
              Income Trends
            </Typography>
            <IncomeTrends incomeData={income} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Analytics;
