import React, { useContext } from "react";
import { Grid, Typography, Box, useTheme } from "@mui/material";
import { DataContext } from "../../state/Datacontext";
import NetworthChart from "../../analytics/charts/NetworthChart";

function Breakdown() {
  const theme = useTheme();
  const {
    incomeTotalsbyMonth,
    expenseTotalsbyMonth,
    savingsTotalsbyMonth,
    netWorth,
  } = useContext(DataContext);
  console.log(netWorth)

  // Define the colors to match the pie chart
  const colors = {
    income: theme.palette.income.main,
    savings: theme.palette.savings.main,
    expenses: theme.palette.expenses.main,
    // No color for netWorth
  };

  return (
    <Box>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={6}>
          <Grid container spacing={1}>
            {/* Income */}
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 8, // Reduced size
                    height: 8, // Reduced size
                    backgroundColor: colors.income,
                    borderRadius: "50%",
                    marginRight: 1,
                  }}
                />
                <Typography sx={{ color: theme.palette.text.main }}>
                  Income ${incomeTotalsbyMonth.toFixed(2)}
                </Typography>
              </Box>
            </Grid>
            {/* Savings */}
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 8, // Reduced size
                    height: 8, // Reduced size
                    backgroundColor: colors.savings,
                    borderRadius: "50%",
                    marginRight: 1,
                  }}
                />
                <Typography sx={{ color: theme.palette.text.main }}>
                  Savings ${savingsTotalsbyMonth.toFixed(2)}
                </Typography>
              </Box>
            </Grid>
            {/* Expenses */}
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 8, // Reduced size
                    height: 8, // Reduced size
                    backgroundColor: colors.expenses,
                    borderRadius: "50%",
                    marginRight: 1,
                  }}
                />
                <Typography sx={{ color: theme.palette.text.main }}>
                  Expenses ${expenseTotalsbyMonth.toFixed(2)}
                </Typography>
              </Box>
            </Grid>
            {/* Net Worth (no color) */}
            <Grid item xs={6}>
              <Typography sx={{ color: theme.palette.text.main }}>
                Networth ${netWorth.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Chart on the right side */}
        <Grid item xs={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <NetworthChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Breakdown;

