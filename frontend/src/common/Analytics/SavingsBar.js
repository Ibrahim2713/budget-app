import React from "react";
import {connect} from 'react-redux'
import { LinearProgress, Typography, Grid, Container } from "@mui/material";



function SavingsBar() {

  const rows = [];
   // gets the total of goal from savings table
 const totalGoal = rows.reduce((acc, row) => {
  const goalValue = typeof row.actual === 'number' ? row.actual : parseFloat(row.actual.replace(/,/g, ''));
  if (!isNaN(goalValue)) { 
    return acc + goalValue;
  }
  return acc;
}, 0);
    const progress = 10 /100 * 100
    return (
        <Container>
             <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography> $ {totalGoal}</Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography> Total Savings</Typography>
      </Grid>
      <Grid>
        <LinearProgress
  variant="determinate"
  value={progress}
  color="success" 
  sx={{
    height: 10,
    borderRadius: 5
  }}
/>
  </Grid>
</Container>
    )
}


export default SavingsBar

