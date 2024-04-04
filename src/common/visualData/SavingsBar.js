import React from "react";
import { LinearProgress, Typography, Grid, Container } from "@mui/material";



function SavingsBar() {
    const progress = 10 /100 * 100
    return (
        <Container>
             <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography> $30,000</Typography>
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

