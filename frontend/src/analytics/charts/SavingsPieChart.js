import React, {useMemo} from "react";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#E57373",
  "#64B5F6",
  "#81C784",
  "#FFD54F",
  "#9E9D24",
  "#FF8A65",
  "#4DB6AC",
  "#F06292",
  "#D32F2F",
  "#0288D1",
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


function SavingsPieChart({ filteredSavings }) {
const data = useMemo(() => {
  const monthlyData = Array(12).fill(null).map(() => ({}));

  filteredSavings.forEach(({date, amount, category}) => {
    const month = new Date(date).getMonth();
    if(!monthlyData[month][category]){
      monthlyData[month][category] = 0;
    }
      monthlyData[month][category] += amount 
  });

  return monthlyData.map((categories, monthIndex) => {
    return {
      month: MONTH_NAMES[monthIndex],
      categories: Object.entries(categories).map(([name,value]) => ({
        name, value
      }))
    };
  });
}, [filteredSavings])






  return (

      <PieChart width={700} height={700}>
      {data.map(({ month, categories }, index) => (
          <Pie
            key={month}
            data={categories}
            dataKey="value"
            nameKey="name"
            cx={index % 2 === 0 ? "25%" : "75%"}
            cy={index < 2 ? "25%" : "75%"}
            outerRadius="30%"
            fill="#8884d8"
            label={({ name, value }) => `${name}: $${value}`}
          >
            {categories.map((entry, categoryIndex) => (
              <Cell key={`cell-${index}-${categoryIndex}`} fill={COLORS[categoryIndex % COLORS.length]} />
            ))}
          </Pie>
        ))}
        <Tooltip
          formatter={(value, name) => [`Amount: $${value}`, `Category: ${name}`]}
        />
        <Legend />
      </PieChart>
  );
}

export default SavingsPieChart;
