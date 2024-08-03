import React from 'react';
import { List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import { format, parseISO } from 'date-fns';

function RecentExpenses({ expenses }) {
  const theme = useTheme();

  // Sort expenses by date, ensuring date is parsed correctly
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{
          color: theme.palette.secondary.main
        }}
      >
        Recent Expenses
      </Typography>
      <List>
        {sortedExpenses.map((expense, index) => (
          <ListItem 
            key={index} 
            sx={{
              color: theme.palette.secondary.main
            }}
          >
            <ListItemText
              primary={expense.description}
              secondary={`$${expense.amount.toFixed(2)} - ${format(parseISO(expense.date), 'MMMM d, yyyy')}`}
              primaryTypographyProps={{ sx: { color: theme.palette.secondary.main } }}
              secondaryTypographyProps={{ sx: { color: theme.palette.secondary.light } }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default RecentExpenses;
