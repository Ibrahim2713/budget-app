import React, { useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataContext } from '../../state/Datacontext';
import { useTheme } from '@emotion/react';

function NetworthDonutChart() {
    const {
        incomeTotalsbyMonth,
        expenseTotalsbyMonth,
        savingsTotalsbyMonth,
    } = useContext(DataContext);
    const theme = useTheme();

    const data = [
        { name: 'Income', value: incomeTotalsbyMonth },
        { name: 'Savings', value: savingsTotalsbyMonth },
        { name: 'Expenses', value: expenseTotalsbyMonth },
    ];

    const colors = [
        theme.palette.income.main,
        theme.palette.savings.main,
        theme.palette.expenses.main,
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}  // Set the innerRadius to create the donut effect
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default NetworthDonutChart;
