import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function IncomePieChart({ data }) {
  return (
  
      <PieChart width={300} height={150}>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius="80%"
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.category}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
    formatter={(value, name, props) => [`Amount: ${value}`, `Category: ${props.payload.category}`]}
  />
        <Legend />
      </PieChart>
  
  );
}

export default IncomePieChart;
