import React from 'react';
import {  Typography, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

function SavingsLineGraph({data}) {
  const theme = useTheme()
  return (
    <>
        <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
        <div style={{  width: '100%', height: 500, overflow: 'auto'  }}>
          
        <ResponsiveContainer width="100%" height={400}>
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
        stroke={theme.palette.savings.main}
        strokeWidth={5}
        dot={{ r: 5 }}
      />
     
    </LineChart>
    </ResponsiveContainer>
    </div>
       </Grid>
      </Grid>
  </>
  )
}

export default SavingsLineGraph
