import React from "react";
import { LinearProgress, Typography, Container, Grid } from "@mui/material";

function IncomeBar() {
  const progress = (10 / 100) * 100;
  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography> $5,000</Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography> Total Income</Typography>
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
    </Container>
  );
}

export default IncomeBar;
