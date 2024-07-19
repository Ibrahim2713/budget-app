import React from 'react';
import {  Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



function ExpensesLineGraph  ({data})  {




  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Expenses Trend
      </Typography>
      <Grid container justifyContent="center">
        <LineChart width={600} height={300} data={data} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value, name, props) => [`${value}`, `${props.payload.category}`]} />
          <Legend />
          <Line type="monotone" dataKey="expenses" stroke="#8884d8" />
        </LineChart>
      </Grid>
    </>
  );
}; 

export default ExpensesLineGraph;