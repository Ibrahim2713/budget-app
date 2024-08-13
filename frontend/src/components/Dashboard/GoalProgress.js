import React, { useContext } from "react";
import { Box, Typography, LinearProgress, useTheme } from "@mui/material";
import { DataContext } from "../../state/Datacontext";

function GoalProgress() {
  const theme = useTheme();
  const {
    goals,
    incomeTotalsbyMonth,
    expensesTotalsbyMonth,
    savingsTotalsbyMonth,
  } = useContext(DataContext);
  console.log(goals)

  // Function to get the total amount for a specific goal
  const getTotalAmountForGoal = (goal) => {
    const month = new Date().getMonth() + 1; // Current month
    let totalAmount = 0;

    // Get the total amount for the current month based on the goal type
    if (goal.type === "savings") {
      totalAmount = savingsTotalsbyMonth[month]?.amount || 0;
    } else if (goal.type === "expenses") {
      totalAmount = expensesTotalsbyMonth[month]?.amount || 0;
    } else if (goal.type === "income") {
      totalAmount = incomeTotalsbyMonth[month]?.amount || 0;
    }

    return totalAmount;
  };

  // Sort goals by creation date and limit to 5 most recent
  const recentGoals = goals
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <Box p={2} sx={{ backgroundColor: theme.palette.primary.main }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: theme.palette.text.main }}
      >
        Recent Goals
      </Typography>
      {recentGoals.length > 0 ? (
        recentGoals.map((goal, index) => {
          const totalAmount = getTotalAmountForGoal(goal);
          const progress = goal.amount ? (totalAmount / goal.amount) * 100 : 0;

          return (
            <Box key={index} mb={2}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.secondary.light }}
              >
                <strong>Type:</strong> {goal.type}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.secondary.light }}
              >
                {goal.description}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.secondary.light }}
              >
                Deadline: {new Date(goal.deadline).toLocaleDateString()}
              </Typography>
              {goal.amount !== undefined && (
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: theme.palette.grey[200],
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: theme.palette.secondary.main,
                    },
                  }}
                />
              )}
              <Typography
                variant="body2"
                sx={{ color: theme.palette.secondary.light, mt: 1 }}
              >
                {goal.amount !== undefined
                  ? `$${totalAmount.toFixed(2)} of $${goal.amount.toFixed(2)}`
                  : `Amount information unavailable`}
              </Typography>
            </Box>
          );
        })
      ) : (
        <Typography
          variant="body2"
          sx={{ color: theme.palette.secondary.light }}
        >
          No recent goals set.
        </Typography>
      )}
    </Box>
  );
}

export default GoalProgress;
