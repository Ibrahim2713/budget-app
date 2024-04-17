import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import { connect } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF00BF'];


function SavingsPieChart({rows}) {

const data = rows.map((row) => ({
  name: row.name,
  value: row.actual,
}));
  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Monthly Savings Breakdown
      </Typography>
      <Grid container justifyContent="center">
        <PieChart width={600} height={400}>
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

const mapStateToProps = (state) => ({
  rows: state.savings.rows,
});

export default connect(mapStateToProps)(SavingsPieChart);