import React from "react";
import { LinearProgress, Typography, Container, Grid } from "@mui/material";
import ExpensesCategory from "./ExpensesCategory";



function ExpensesBreakdown() {
    const progress = 10 /100 * 100
    return (
        <Container>
        <Grid>
          <Typography> % of Income allocated to Expenses</Typography>
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
          <Typography> Monthly Expenses Breakdown</Typography>
        
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
                backgroundColor: "red",
              },
            }}
          />
        </Grid>
        <Grid>
            <ExpensesCategory />
        </Grid>
      </Container>
    )
}




export default ExpensesBreakdown