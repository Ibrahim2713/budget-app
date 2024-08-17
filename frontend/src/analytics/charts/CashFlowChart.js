import React, { useContext, useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DataContext } from "../../state/Datacontext";

const CashFlowChart = () => {
  const { filteredIncome, filteredExpenses } = useContext(DataContext);
  const theme = useTheme();

  // Aggregates income data
  const getIncomeTotal = (data) => {
    return data.reduce((acc, item) => acc + item.amount, 0);
  };

  // Aggregates expense data
  const getExpenseTotal = (data) => {
    return data.reduce((acc, item) => acc + item.value, 0);
  };

  // Calculate totals
  const totalIncome = useMemo(() => getIncomeTotal(filteredIncome), [filteredIncome]);
  const totalExpenses = useMemo(() => getExpenseTotal(filteredExpenses), [filteredExpenses]);

  // Prepare data for the chart
  const data = useMemo(() => [
    { name: "Income", totalIncome },
    { name: "Expenses", totalExpenses },
  ], [totalIncome, totalExpenses]);

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: "600",
          color: theme.palette.text.main,
          mb: 1,
        }}
      >
        Cash Flow: Income vs. Expenses
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="totalIncome" 
            fill={theme.palette.income.main} 
            name="Income"
          />
          <Bar 
            dataKey="totalExpenses" 
            fill={theme.palette.expenses.main} 
            name="Expenses"
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CashFlowChart;
