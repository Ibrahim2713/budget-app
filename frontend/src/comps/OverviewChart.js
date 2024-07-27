import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";

const OverviewChart = ({ 
  isDashboard = false, 
  view = "income", 
  data, 
  dataKey 
}) => {
  const theme = useTheme();
 


  // Generate lines for chart
  const [dataLine] = useMemo(() => {
    if (!data) return [];

    const lineData = {
      id: dataKey,
      color: theme.palette.secondary.light,
      data: [],
    };

    // Iterate through numeric months from 1 to 12
    for (let month = 1; month <= 12; month++) {
      const monthData = data.find(item => item.month === month);
      lineData.data.push({
        x: month, // Use month number directly
        y: monthData ? monthData[dataKey] : 0, // Default to 0 if no data for that month
      });
    }

    return [lineData];
  }, [data, dataKey, theme.palette.secondary.light]);

  if (!data) return "Loading...";

  return (
    <ResponsiveLine
      data={dataLine ? [dataLine] : []}
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
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
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
          // Convert numeric month to name
          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          return monthNames[v - 1]; // Convert 1-based month index to 0-based array index
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
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
        legend: isDashboard
          ? ""
          : `Total ${view.charAt(0).toUpperCase() + view.slice(1)} for Year`,
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
          : undefined }
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
              </div>
               )}
    />
  );
};

export default OverviewChart;
