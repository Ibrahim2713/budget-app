import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography, useTheme, Button } from '@mui/material';
import { format, parseISO } from 'date-fns';

function RecentExpenses({ expenses }) {
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);

  // Sort expenses by date, ensuring date is parsed correctly
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Determine the number of expenses to display
  const expensesToShow = showAll ? sortedExpenses : sortedExpenses.slice(0, 4);

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
        {expensesToShow.map((expense, index) => (
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
      <Button 
        onClick={() => setShowAll(!showAll)}
        sx={{
          color: theme.palette.secondary.main,
          textTransform: 'none',
          mt: 1
        }}
      >
        {showAll ? 'Show Less' : 'Show More'}
      </Button>
    </div>
  );
}

export default RecentExpenses;
