import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { date: '2024-04-01', expenses: 100 },
  { date: '2024-04-02', expenses: 150 },
  { date: '2024-04-03', expenses: 120 },
  { date: '2024-04-04', expenses: 200 },
  { date: '2024-04-05', expenses: 180 },
  // Add more data as needed
];

const ExpensesLineChart = () => {
  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Daily Expenses Trend
      </Typography>
      <Grid container justifyContent="center">
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expenses" stroke="#8884d8" />
        </LineChart>
      </Grid>
    </Container>
  );
};

export default ExpensesLineChart;