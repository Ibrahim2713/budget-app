import React from "react";
import { LinearProgress, Typography, Container, Grid } from "@mui/material";


function ExpensesOverview() {
    const progress = (10 / 100) * 100;
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
            <Typography> 6,000</Typography>
          </Grid>
          <Grid
            item
          >
            <Typography>Actual</Typography>
            <Typography> $8,500</Typography>
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
          <Typography> $2,500 </Typography>
          <Typography> over budget this month</Typography>
        </Grid>
      </Container>
    )
}




export default ExpensesOverview