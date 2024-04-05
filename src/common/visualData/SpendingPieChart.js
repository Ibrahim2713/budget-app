import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Food", value: 400 },
  { name: "Housing", value: 800 },
  { name: "Transportation", value: 300 },
  { name: "Entertainment", value: 200 },
  { name: "Others", value: 500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];


function SpendingPieChart() {
  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Monthly Income Overview
      </Typography>
      <Grid container justifyContent="center">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Grid>
    </Container>
  );
}

export default SpendingPieChart;
