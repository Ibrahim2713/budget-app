import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#6A5ACD', '#FF1493', '#40E0D0', '#D2691E'];


export default function ExpensesPieChart({data}) {
  return (
    <>

          <PieChart width={325} height={400}>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
          formatter={(value, name, props) => [`Amount: ${value}`, `Category: ${props.payload.category}`]}
        />
            <Legend />
          </PieChart>
      
        </>
  )
}
