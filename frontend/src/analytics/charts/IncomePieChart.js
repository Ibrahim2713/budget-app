import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// Define colors for the chart
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
  '#FF6347', '#6A5ACD', '#8A2BE2', '#5F9EA0', 
  '#D2691E', '#FF4500', '#2E8B57', '#4B0082', 
  '#7FFF00', '#DC143C', '#FF1493', '#00FA9A', 
  '#FFD700', '#ADFF2F', '#FF69B4', '#9932CC'  
];

function IncomePieChart({ filteredIncome }) {


  // Aggregate income by category
  const data = useMemo(() => {
    const categoryData = {};

    filteredIncome.forEach(({ amount, category }) => {
      if (!categoryData[category]) {
        categoryData[category] = 0;
      }
      categoryData[category] += amount;
    });

    return Object.entries(categoryData).map(([name, value]) => ({
      name,
      value,
    }));
  }, [filteredIncome]);

  return (
    
     
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="40%"
            fill="#8884d8"
            label={({ name, value }) => `$${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`Amount: $${value}`, `Category: ${name}`]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    
  );
}

export default IncomePieChart;
