import React, { useMemo } from "react";
import { useTheme } from "@emotion/react";
import { ResponsiveLine } from "@nivo/line";

const IncomeTrends = ({ incomeData = [] }) => {
  const theme = useTheme();

  // Define the color for the expense dataset
  const color = theme.palette.expenses.dark;

  // Define month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Combine the data into one array for expenses
  const dataLines = useMemo(() => {
    if (!incomeData.length) return [];

    const months = Array.from({ length: 12 }, (_, month) => month + 1);

    return [
      {
        id: "income",
        color: color,
        data: months.map((month) => {
          const dataItem = incomeData.find(item => item.month === month);
          const amount = dataItem ? Number(dataItem.amount) : 0;

          // Validate the amount and ensure it's a number
          const validatedAmount = isNaN(amount) ? 0 : amount;

          return {
            x: month,
            y: validatedAmount,
            label: `Income: ${validatedAmount}`
          };
        }),
      }
    ];
  }, [incomeData, color]);

  return (
    <ResponsiveLine
      data={dataLines}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.text.main,
            },
          },
          legend: {
            text: {
              fill: theme.palette.text.main,
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary.light,
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.text.main,
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary.light,
          },
        },
        tooltip: {
          container: {
            color: theme.palette.text.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 70, left: 70 }}
      xScale={{
        type: "point",
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={false}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => monthNames[v - 1], // Format x-axis values as month names
        orient: "bottom",
        tickSize: 10,
        tickPadding: 10,
        tickRotation: 0,
        tickValues: [1, 4, 7, 10],
        legend: "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Amount",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={theme.palette.income.main}
      pointBorderWidth={2}
      pointBorderColor={theme.palette.income.main}
      pointLabelYOffset={-12}
      pointLabel="label"
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 30,
          translateY: -40,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: theme.palette.income.main,
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: theme.palette.expenses.dark,
                itemOpacity: 1,
              },
            },
          ],
        }
      ]}
      tooltip={({ point }) => (
        <div
          style={{
            background: theme.palette.background.paper,
            padding: "0.5rem",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <strong>{monthNames[point.data.x - 1]}</strong> {/* Convert x value to month name */}
          <br />
          Income: ${point.data.yFormatted}
          <br />
        </div>
      )}
    />
  );
};

export default IncomeTrends;
