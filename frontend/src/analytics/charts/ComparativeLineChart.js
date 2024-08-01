import React, { useMemo } from "react";
import { useTheme } from "@emotion/react";
import { ResponsiveLine } from "@nivo/line";

const ComparativeLineChart = ({ isDashboard = false, incomeData = [], savingsData = [], expensesData = [] }) => {
  const theme = useTheme();

  // Define the keys for different datasets
  const dataKeys = ["income", "savings", "expenses"];

  // Define colors for each dataset
  const colors = {
    income: "#008000",
    savings: "#007FFF",
    expenses:"#ff0000",
  };
console.log(colors["income"])
  // Combine the data into one array
  const dataLines = useMemo(() => {
    if (!incomeData.length && !savingsData.length && !expensesData.length) return [];
    

    const months = Array.from({ length: 12 }, (_, month) => month + 1);


    return dataKeys.map((key) => {
      const dataset = key === "income" ? incomeData : key === "savings" ? savingsData : expensesData;
      
      return {
        id: key,
        color: colors[key],
        data: months.map((month) => {
          const dataItem = dataset.find(item => item.month === month);
          return {
            x: month,
            y: dataItem ? dataItem.amount : 0,
          };
        }),
      };
    });
  }, [incomeData, savingsData, expensesData, dataKeys, colors]);

  return (
    <ResponsiveLine
      data={dataLines}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary.light,
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary.light,
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
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 70, left: 70 }}  // Increased bottom margin
      xScale={{
        type: "point",
        // Optionally adjust the range of the x-axis scale
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
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          return monthNames[v - 1];
        },
        orient: "bottom",
        tickSize: 10,  // Increased tick size
        tickPadding: 10,  // Increased tick padding
        tickRotation: 0,
        tickValues: [1, 4, 7, 10],  // Customize tick values to control spacing
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Amount",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
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
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
      tooltip={({ point }) => (
        <div
          style={{
            background: theme.palette.background.paper,
            padding: "0.5rem",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <strong>{point.data.xFormatted}</strong>
          <br />
          Amount: ${point.data.yFormatted}
          <br />
        </div>
      )}
    />
  );
};

export default ComparativeLineChart;
