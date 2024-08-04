import * as React from 'react';
import { useTheme } from '@emotion/react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { legendClasses } from '@mui/x-charts/ChartsLegend';

export default function ComparativeBarChart({ incomeData, expensesData }) {
  const theme = useTheme();
 


  

  const numberOfMonths = 12;
  const monthlyIncome = Array(numberOfMonths).fill(0);
  const monthlyExpenses = Array(numberOfMonths).fill(0);

  incomeData.forEach((record) => {
    const monthIndex = record.month - 1;
    monthlyIncome[monthIndex] += record.amount;
  });

  expensesData.forEach((record) => {
    const monthIndex = record.month - 1;
    monthlyExpenses[monthIndex] += record.amount;
  });

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  return (
    <BarChart
    sx={(theme) => ({
      '& .MuiBarElement-series-l_id': {
        stroke: theme.palette.text.main,
      },
      '& .MuiBarElement-series-r_id': {
        stroke: theme.palette.text.main,
      },
      [`& .${axisClasses.root}`]: {
        [`& .${axisClasses.tick}, & .${axisClasses.line}`]: {
          stroke: '#006BD6',
          strokeWidth: 3,
        },
        [`& .${axisClasses.tickLabel}`]: {
          fill: '#006BD6',
        },
      },
      [`& .${legendClasses.root} .${legendClasses.series} text`]: {
        fill: `${theme.palette.text.main} !important`,
      },
    })}
      series={[
        { label: 'Income', data: monthlyIncome },
        { label: 'Expenses', data: monthlyExpenses },
      ]}
      height={290}
      xAxis={[
        {
          data: months,
          scaleType: 'band',
        },
      ]}
      yAxis={[]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}
