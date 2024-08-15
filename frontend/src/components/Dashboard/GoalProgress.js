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
 

  // Function to get the total amount for a specific goal
 

  // Sort goals by creation date and limit to 5 most recent
  const recentGoals = goals
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <Box p={2} sx={{ backgroundColor: theme.palette.primary.light }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: theme.palette.text.main }}
      >
        Recent Goals
      </Typography>
      {recentGoals.length > 0 ? (
        recentGoals.map((goal, index) => {
       

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
