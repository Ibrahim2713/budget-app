import * as React from 'react';
import { useTheme } from '@emotion/react';
import { BarChart } from '@mui/x-charts/BarChart';

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
    sx={{
        '& .MuiChartAxis-root': {
          '& line': {
            stroke: theme.palette.text.main, // Change the axis line color
          },
          '& text': {
            fill: theme.palette.text.main, // Change the axis text color
          },
        },
      }}
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
