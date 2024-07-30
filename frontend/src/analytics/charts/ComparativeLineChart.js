import React from 'react'
import { Box, Typography, Button, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';


function ComparativeLineChart({incomeData, expenseData, savings}) {
   const data = {
    labels: incomeData.map(item => item.date), // Assuming both datasets share the same dates
    datasets: [
      {
        label: 'Income',
        data: incomeData.map(item => item.amount),
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        fill: true,
      },
      {
        label: 'Expenses',
        data: expenseData.map(item => item.amount),
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
      },
    ],
  }; 



  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
      },
    },
  };
  const theme = useTheme()
  return (
    <ComparativeLineChart incomeData={incomeData} expenseData={expenseData} />
  )
}

export default ComparativeLineChart