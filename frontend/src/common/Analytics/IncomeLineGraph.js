import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchIncome } from '../../state/actionCreators';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

function IncomeLineGraph({ fetchIncome, income }) {
  const [tooltipData, setTooltipData] = useState(null);
  const token = localStorage.getItem('token');

  const formattedData = income.map(item => ({
    date: new Date(item.date).toISOString().split('T')[0],
    amount: Math.floor(Number(item.amount)),
    source: item.source,
  }));

  const handleDotClick = (data) => {
    setTooltipData(data);
  };

  const handleCloseTooltip = () => {
    setTooltipData(null);
  };

  useEffect(() => {
    if (token) {
      fetchIncome(token);
    }
  }, [token, fetchIncome]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${label}`}</p>
          <p className="intro">{`Amount: $${payload[0].value}`}</p>
          <p className="desc">{`Source: ${payload[0].payload.source}`}</p>
          <button onClick={handleCloseTooltip}>Close</button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <h2>Income Over Time</h2>
      <LineChart
        width={600}
        height={300}
        data={formattedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="rgba(75, 192, 192, 1)"
          strokeWidth={3}
          dot={{
            r: 5,
            onClick: (e) => handleDotClick(e.payload),
          }}
        />
      </LineChart>
    </>
  );
}

const mapStateToProps = (state) => ({
  income: state.income.income,
});

const mapDispatchToProps = {
  fetchIncome,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeLineGraph);
