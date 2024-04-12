import React from "react";
import { connect } from "react-redux";
import { LinearProgress, Typography, Container, Grid } from "@mui/material";
 
function IncomeBar({rows}) {
  // gets the total of goal from income table
  const totalGoal = rows.reduce((acc, row) => {
    const goalValue = typeof row.actual === 'number' ? row.actual : parseFloat(row.actual.replace(/,/g, ''));
    if (!isNaN(goalValue)) { 
      return acc + goalValue;
    }
    return acc;
  }, 0);

  const progress = (10 / 100) * 100;
  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography> $ {totalGoal.toLocaleString()}</Typography>
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
const mapStateToProps = (state) => ({
  rows: state.income.rows,
});


export default connect(mapStateToProps)(IncomeBar);
