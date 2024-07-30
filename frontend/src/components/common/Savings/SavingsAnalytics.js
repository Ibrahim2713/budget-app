import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { DataContext } from "../../../state/Datacontext";
import { Grid, Box, Paper, CircularProgress } from "@mui/material";
import SavingsLineGraph from "../../../analytics/charts/SavingsLineGraph"
import SavingsBarGraph from "../../../analytics/charts/SavingsBarGraph"
import SavingsTable from "../../../analytics/charts/SavingsTable"
import { formatDataByMonth } from "../../../analytics/utils/formatData";

function SavingsAnalytics() {
  const [filteredSavings, setFilteredSavings] = useState([]);
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
          <Box display="flex" justifyContent="center">
            <Paper>
              <SavingsLineGraph data={filteredSavings} />
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={8} md={6}>
          <Box display="flex" justifyContent="center">
            <SavingsBarGraph data={filteredSavings} />
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={8} ms={6}>
          <Box display="flex" justifyContent="center">
            <SavingsTable data={filteredSavings} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}


export default SavingsAnalytics;
