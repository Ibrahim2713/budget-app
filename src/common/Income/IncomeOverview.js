import React from "react";
import { LinearProgress, Typography, Container, Grid } from "@mui/material";

function IncomeOverview() {
  const progress = (10 / 100) * 100;
  return (
    <Container>
      <Grid>
        <Typography> Monthly Income Overview</Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid
          item
          
        >
          <Typography>Goal</Typography>
          <Typography> $10,000</Typography>
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
        <Typography> $50 </Typography>
        <Typography> over goal this month</Typography>
      </Grid>
    </Container>
  );
}

export default IncomeOverview;
