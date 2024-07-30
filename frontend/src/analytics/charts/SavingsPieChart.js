import React from "react";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer} from "recharts";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF00BF'];


function SavingsPieChart({data}) {


  return (
    <>
        <ResponsiveContainer width="100%" height={400}>
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="amount"
        nameKey="description"
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
    formatter={(value, name, props) => [`Amount: ${value}`, `Description: ${props.payload.description}`]}
  />
      <Legend />
    </PieChart>
    </ResponsiveContainer>
  </>

  );
}



export default SavingsPieChart;