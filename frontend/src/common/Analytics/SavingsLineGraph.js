import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function SavingsLineGraph({data}) {
  return (
    <>
    <h2 style={{display: 'flex', justifyContent: 'center'}}>Savings Analytics</h2>
    <LineChart
      width={800}
      height={500}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="amount"
        stroke="rgba(75, 192, 192, 1)"
        strokeWidth={3}
        dot={{ r: 5 }}
      />
    </LineChart>
  </>
  )
}

export default SavingsLineGraph
