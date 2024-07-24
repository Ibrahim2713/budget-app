import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Box, Paper, CircularProgress } from "@mui/material";
import ExpensesLineGraph from "../Analytics/Expenses/ExpensesLineGraph.js.js";
import ExpensesPieChart from "../Analytics/Expenses/ExpensesPieChart.js";
import ExpenseTable from "../Analytics/Expenses/ExpenseTable.js";
import { fetchExpenses } from "../../state/actionCreators";
import { formatDataByMonth } from "../../utils/formatData";

function ExpensesAnalytics({ fetchExpenses, expenses, selectedDate }) {
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchExpenses(token).then(() => {
        setLoading(false); // Set loading to false after data is fetched
      });
    }
  }, [fetchExpenses]);

  useEffect(() => {
    const formattedData = formatDataByMonth(expenses, selectedDate);
    setFilteredExpenses(formattedData);
  }, [expenses, selectedDate]);

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

const mapStateToProps = (state) => ({
  expenses: state.expense.expenses,
  selectedDate: state.date.selectedDate,
});

const mapDispatchToProps = {
  fetchExpenses,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesAnalytics);