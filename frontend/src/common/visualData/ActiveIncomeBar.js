import React from "react";
import { LinearProgress, Typography, Container, Grid } from "@mui/material";

function ActiveIncomeBar() {
    const progress = 10 /100 * 100
  return (
    <Container>
      <Grid>
        <Typography> Active Income</Typography>
        <Typography> $6,500</Typography>
      </Grid>
      <Grid>
        <LinearProgress
          variant="determinate"
          value={progress}
          color="secondary"
          sx={{
            height: 10,
            borderRadius: 5,
            "& .MuiLinearProgress-barColorSecondary": {
              backgroundColor: "green",
            },
          }}
        />
      </Grid>

      <Grid>
        <Typography> Passive Income</Typography>
        <Typography> $550 </Typography>
      </Grid>
      <Grid>
      <LinearProgress
          variant="determinate"
          value={progress}
          color="secondary"
          sx={{
            height: 10,
            borderRadius: 5,
            "& .MuiLinearProgress-barColorSecondary": {
              backgroundColor: "green",
            },
          }}
        />
      </Grid>
    </Container>
  );
}

export default ActiveIncomeBar;
