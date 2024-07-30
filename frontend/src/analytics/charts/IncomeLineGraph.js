import React from 'react';
import { Typography, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

function IncomeLineGraph({ data }) {
  const theme = useTheme()
 
 
  
  return (
    <>
      <Grid container justifyContent="center" style={{ marginTop: '30px' }}>
        <Grid item xs={12} sm={11} md={10} lg={8}>
          <div style={{ width: '100%', height: 500, overflow: 'auto' }}>
          <ResponsiveContainer width="100%" height={400}>
    \       <LineChart width={800} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value, name, props) => [`${value}`, `${props.payload.source}`]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke={theme.palette.income.main}
                  strokeWidth={5}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default IncomeLineGraph;
