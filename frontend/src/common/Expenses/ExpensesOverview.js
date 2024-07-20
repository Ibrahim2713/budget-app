import React from "react";
import { LinearProgress, Typography, Container, Grid } from "@mui/material";


function ExpensesOverview() {

  const rows = [];
  // gets the total of goal from expense table
  const totalGoal = rows.reduce((acc, row) => {
    const goalValue = typeof row.goal === 'number' ? row.goal : parseFloat(row.goal.replace(/,/g, ''));
    if (!isNaN(goalValue)) { 
      return acc + goalValue;
    }
    return acc;
  }, 0);
// gets the total of actual from expense table
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
    message = `You spent $${difference.toFixed(2)} over budget .`;
  } else if (difference < 0) {
    message = `You spent $${Math.abs(difference).toFixed(2)} less than you expected.`;
  } else {
    message = 'You are on budget.';
  }
  // Displays progress 
  const progress = Math.min(100, (totalActual / totalGoal) * 100);
    return (
        <Container>
        <Grid>
          <Typography> Monthly Expenses Overview</Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid
            item
          >
            <Typography>Budget</Typography>
            <Typography> $ {totalGoal}</Typography>
          </Grid>
          <Grid
            item
          >
            <Typography>Actual</Typography>
            <Typography> ${totalActual}</Typography>
          </Grid>
        </Grid>
  
        <Grid>
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
        <Grid>
          <Typography> {message} </Typography>
        </Grid>
      </Container>
    )
}





export default ExpensesOverview;