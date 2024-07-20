import React from "react";
import { LinearProgress, Typography, Container, Grid } from "@mui/material";

function SavingsOverview() {
  const rows = [];
  // gets the total of goal from savings table
  const totalGoal = rows.reduce((acc, row) => {
    const goalValue = typeof row.goal === 'number' ? row.goal : parseFloat(row.goal.replace(/,/g, ''));
    if (!isNaN(goalValue)) { 
      return acc + goalValue;
    }
    return acc;
  }, 0);
// gets the total of actual from savings table
  const totalActual = rows.reduce((acc, row) => {
    const actualValue = typeof row.actual === 'number' ? row.actual : parseFloat(row.actual.replace(/,/g, ''));
    if (!isNaN(actualValue)) { 
      return acc + actualValue;
    }
    return acc;
  }, 0)

  const difference = totalActual - totalGoal;
// Displays message for user depending if they saved or not
  let message = '';
  if (difference > 0) {
    message = `You saved $${difference.toFixed(2)} over .`;
  } else if (difference < 0) {
    message = `You saved $${Math.abs(difference).toFixed(2)} less than you expected.`;
  } else {
    message = 'You are on budget.';
  }
  // Displays progress 
  const progress = Math.min(100, (totalActual / totalGoal) * 100);
  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Typography variant="h6" align="right">Goal: ${totalGoal.toLocaleString()}</Typography>
        </Grid>
        <Grid item xs={4}>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={progress < 100 ? "primary" : "secondary"}
            sx={{
              height: 10,
              borderRadius: 5,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Actual: ${totalActual.toLocaleString()}</Typography>
        </Grid>
      </Grid>
      <Grid>
        <Typography>{message}</Typography>
      </Grid>
    </Container>
  );
}



export default SavingsOverview;
