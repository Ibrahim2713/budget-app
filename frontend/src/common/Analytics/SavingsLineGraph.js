import React from 'react';
import {  Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function SavingsLineGraph({data}) {
  return (
    <>
  <Typography variant="h5" align="center" gutterBottom>
        Savings Trend
      </Typography>
        <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
        <div style={{  width: '100%', height: 500, overflow: 'auto'  }}>
    <LineChart
      width={800}
      height={400}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip formatter={(value, name,props) => [`${value}`, `${props.payload.description}`]} />
      <Legend />
      <Line
        type="monotone"
        dataKey="amount"
        stroke="#FF69B4"
        strokeWidth={5}
        dot={{ r: 5 }}
      />
     
    </LineChart>
    </div>
       </Grid>
      </Grid>
  </>
  )
}

export default SavingsLineGraph
