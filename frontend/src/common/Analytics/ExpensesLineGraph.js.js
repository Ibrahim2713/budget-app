import React from 'react';
import {  Typography, Grid, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter, ScatterChart} from 'recharts';



function ExpensesLineGraph  ({data})  {


 

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Expenses Trend
      </Typography>
      <Grid container justifyContent="center"  style={{ marginTop: '30px' }}>
      <Grid item xs={12} sm={11} md={10} lg={8} >
        <div style={{  width: '100%', height: 500, overflow: 'auto'  }}>
            <LineChart width={800} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value, name, props) => [`${value}`, `${props.payload.category}`]} />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#FF0000" strokeWidth={5}  dot={{ r: 5 }} />
              <Scatter data={data} fill="red" />
            </LineChart>
            </div>
          
        </Grid>
      </Grid>
    </>
  );
}; 

export default ExpensesLineGraph;