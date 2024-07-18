import React from 'react'
import { connect } from 'react-redux'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';





const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function IncomePieChart({ data }) {
    return (
        <>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="source"
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
            <Tooltip />
            <Legend />
          </PieChart>
        </>
      );
    }

const mapStateToProps = (state) => ({
    income: state.income.income,
  });

export default connect(mapStateToProps)(IncomePieChart)