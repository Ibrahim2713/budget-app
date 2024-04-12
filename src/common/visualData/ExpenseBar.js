import React from "react";
import { connect } from "react-redux";
import { LinearProgress, Typography, Container, Grid } from "@mui/material";



function ExpenseBar({rows}) {
  console.log(rows)
 // gets the total of goal from expense table
 const totalGoal = rows.reduce((acc, row) => {
  const goalValue = typeof row.actual === 'number' ? row.actual : parseFloat(row.actual.replace(/,/g, ''));
  if (!isNaN(goalValue)) { 
    return acc + goalValue;
  }
  return acc;
}, 0);
  const progress = 100
    return (
        <Container>
            <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>  $ {totalGoal.toLocaleString()} </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography> Total Expenses</Typography>
      </Grid>
        <Grid>
        <LinearProgress
  variant="determinate"
  value={progress}
  color="secondary" 
  sx={{
    height: 10,
    borderRadius: 5,
    bgcolor: 'grey.400',
    '& .MuiLinearProgress-barColorSecondary': {
      backgroundColor: 'red', 
    },
  }}
/>
  </Grid>
</Container>
    )
}
const mapStateToProps = (state) => ({
  rows: state.expense.rows,
});

export default connect(mapStateToProps)(ExpenseBar)
