import React from 'react';
import { useTheme } from '@emotion/react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Define your colors

const BreakdownChart = ({ data, view }) => {

  const theme = useTheme()
  // Get the transactions based on the selected view
  const transactions = data[view.toLowerCase()] || []; 

  
  // Aggregate data by category
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  
  // Format data for the PieChart
  const formattedData = Object.keys(categoryTotals).map(key => ({
    name: key,
    value: categoryTotals[key],
  }));

  // Custom tooltip renderer
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      console.log(value)
      return (
        <div style={{ backgroundColor: theme.palette.primary.main, padding: '5px', border: '1px solid #ccc', color: theme.palette.secondary.light }}>
          <p>{`Category: ${name}`}</p>
          <p>{`Amount: $${value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <PieChart width={400} height={400}>
      <Pie 
        data={formattedData} 
        dataKey="value" 
        nameKey="name" 
        outerRadius={150} 
        fill="#8884d8" 
        label
      >
        {formattedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />}/>
      <Legend />
    </PieChart>
  );
};

export default BreakdownChart;
