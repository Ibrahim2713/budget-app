import React, { useContext } from 'react';
import { Box, Typography, LinearProgress, useTheme } from '@mui/material';
import { DataContext } from '../state/Datacontext';

function IncomeGoalProgress() {
  const theme = useTheme();
  const { goals, incomeTotal } = useContext(DataContext);

  // Find the most recent income goal
  const recentIncomeGoal = goals
    .filter(goal => goal.type === 'income')
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

  // Calculate progress
  const progress = recentIncomeGoal ? (incomeTotal / recentIncomeGoal.amount) * 100 : 0;

  return (
    <Box p={2} sx={{ backgroundColor: theme.palette.primary.main }}>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.main }}>
        Income Goal Progress
      </Typography>
      {recentIncomeGoal ? (
        <>
          <Typography variant="body1" sx={{ color: theme.palette.secondary.light }}>
            {recentIncomeGoal.description}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: theme.palette.grey[200],
              '& .MuiLinearProgress-bar': {
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          />
          <Typography variant="body2" sx={{ color: theme.palette.secondary.light, mt: 1 }}>
            {`$${incomeTotal.toFixed(2)} of $${recentIncomeGoal.amount.toFixed(2)}`}
          </Typography>
        </>
      ) : (
        <Typography variant="body2" sx={{ color: theme.palette.secondary.light }}>
          No income goals set.
        </Typography>
      )}
    </Box>
  );
}

export default IncomeGoalProgress;
