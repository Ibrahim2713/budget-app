import React from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { useTheme } from "@emotion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
} from "recharts";

function ExpensesLineGraph({ data }) {
  const theme = useTheme();

  return (
    <LineChart   width={500}
    height={300}data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip
        formatter={(value, name, props) => [
          `${value}`,
          `${props.payload.category}`,
        ]}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="amount"
        stroke={theme.palette.expenses.main}
        strokeWidth={5}
        dot={{ r: 5 }}
      />
    </LineChart>
  );
}

export default ExpensesLineGraph;
