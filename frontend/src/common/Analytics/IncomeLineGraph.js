import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function IncomeLineGraph({ data }) {

  return (
    <>
      <h2>Income Analytics</h2>
      <LineChart
        width={600}
        height={300}
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
  );
}

export default IncomeLineGraph;
