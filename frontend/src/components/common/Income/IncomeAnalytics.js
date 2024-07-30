import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Grid, Box, Paper, CircularProgress } from "@mui/material";
import IncomeLineGraph from "../../../analytics/charts/IncomeLineGraph"
import IncomePieChart from "../../../analytics/charts/IncomePieChart"
import IncomeTable from "../../../analytics/charts/IncomeTable"
import { DataContext } from "../../../state/Datacontext";
import { formatDataByMonth } from "../../../analytics/utils/formatData";

function IncomeAnalytics() {
  const [filteredIncome, setFilteredIncome] = useState([]);
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
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <IncomeLineGraph data={filteredIncome} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <IncomePieChart data={filteredIncome} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={8} ms={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <IncomeTable data={filteredIncome} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}



export default IncomeAnalytics;
