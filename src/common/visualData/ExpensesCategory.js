import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { category: 'Food', expenses: 400 },
  { category: 'Housing', expenses: 800 },
  { category: 'Transportation', expenses: 300 },
  { category: 'Entertainment', expenses: 200 },
  { category: 'Others', expenses: 500 },
  // Add more data as needed
];

const ExpensesCategory = () => {
  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Expenses by Category
      </Typography>
      <Grid container justifyContent="center">
        <BarChart width={600} height={300} data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="expenses" fill="#8884d8" />
        </BarChart>
      </Grid>
    </Container>
  );
};

export default ExpensesCategory;
