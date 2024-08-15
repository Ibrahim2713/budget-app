import React, { useContext } from "react";
import { Grid, Typography, Box, useTheme } from "@mui/material";
import { DataContext } from "../state/Datacontext";
import NetworthChart from "../analytics/charts/NetworthChart";

function Breakdown() {
  const theme = useTheme();
  const { incomeTotalsbyMonth, expenseTotalsbyMonth, savingsTotalsbyMonth, netWorth } = useContext(DataContext);

  // Define the colors to match the pie chart
  const colors = {
    income: theme.palette.income.main,
    savings: theme.palette.savings.main,
    expenses: theme.palette.expenses.main,
    netWorth: theme.palette.income.main, // Add a color for net worth if needed
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Grid container spacing={2}>
            {/* Top-left cell */}
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: colors.income,
                    borderRadius: "50%",
                    marginRight: 1,
                  }}
                />
                <Typography sx={{ color: theme.palette.text.main }}>
                  Income ${incomeTotalsbyMonth}
                </Typography>
              </Box>
            </Grid>
            {/* Top-right cell */}
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: colors.savings,
                    borderRadius: "50%",
                    marginRight: 1,
                  }}
                />
                <Typography sx={{ color: theme.palette.text.main }}>
                  Savings ${savingsTotalsbyMonth}
                </Typography>
              </Box>
            </Grid>
            {/* Bottom-left cell */}
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: colors.expenses,
                    borderRadius: "50%",
                    marginRight: 1,
                  }}
                />
                <Typography sx={{ color: theme.palette.text.main }}>
                  Expenses ${expenseTotalsbyMonth}
                </Typography>
              </Box>
            </Grid>
            {/* Bottom-right cell */}
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor: colors.income, // Or use a different color for net worth
                    borderRadius: "50%",
                    marginRight: 1,
                  }}
                />
                <Typography sx={{ color: theme.palette.text.main }}>
                  Networth ${netWorth}
                </Typography>
              </Box>
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
