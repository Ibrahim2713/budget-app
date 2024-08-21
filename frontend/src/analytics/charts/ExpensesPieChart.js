import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "@mui/material";

const COLORS = [
  "#FF6347",
  "#4682B4",
  "#32CD32",
  "#FFD700",
  "#6A5ACD",
  "#FF1493",
  "#40E0D0",
  "#D2691E",
];

export default function ExpensesPieChart({ filteredExpenses }) {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={filteredExpenses}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="40%"
          fill={theme.palette.primary.main}
          label={({ name, value }) => `$${value.toFixed(2)}`}
        >
          {filteredExpenses.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [
            `Amount: $${value.toFixed(2)}`,
            `Category: ${name}`,
          ]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
