import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { Grid, Box, Paper, CircularProgress } from "@mui/material";
import ExpensesLineGraph from "../../../analytics/charts/ExpensesLineGraph.js"
import ExpensesPieChart from "../../../analytics/charts/ExpensesPieChart"
import ExpenseTable from "../../../analytics/charts/ExpenseTable"
import { DataContext } from "../../../state/Datacontext.js";
import { formatDataByMonth } from "../../../analytics/utils/formatData.js";

function ExpensesAnalytics() {
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    income,
    expenses,
    savings,
    selectedDate,
    setSelectedDate,
  } = useContext(DataContext);
  

  

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={3}
        style={{ marginTop: "30px" }}
      >
        <Grid item xs={12} sm={11} md={10} lg={8}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <ExpensesLineGraph data={filteredExpenses} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <ExpensesPieChart data={filteredExpenses} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <ExpenseTable data={filteredExpenses} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}



export default ExpensesAnalytics;
