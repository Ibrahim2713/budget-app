import React from "react";
import { LinearProgress, Typography, Container, Grid } from "@mui/material";



function ExpenseBar() {
    const progress = 10 /100 * 100
  
    return (
        <Container>
            <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography> $2,500</Typography>
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


export default ExpenseBar