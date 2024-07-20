import React from 'react';
import {  Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter, ScatterChart} from 'recharts';



function ExpensesLineGraph  ({data})  {


  console.log(data)

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Expenses Trend
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
        
            <LineChart width={700} height={500}data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value, name, props) => [`${value}`, `${props.payload.category}`]} />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#FF0000" strokeWidth={5} />
              <Scatter data={data} fill="red" />
            </LineChart>
   
        </Grid>
      </Grid>
    </>
  );
}; 

export default ExpensesLineGraph;