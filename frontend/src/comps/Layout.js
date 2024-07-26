import React, { useState } from "react";
import { fetchIncome, fetchSavings, fetchExpenses } from "../state/actionCreators";
import mockData from "./Mockdata";
import FlexBetween from "./FlexBetween";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StatBox from "./StatBox";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import OverviewChart from "./OverviewChart";
import BreakdownChart from "./BreakdownChart";
import { Box, Button, Typography, useTheme, useMediaQuery, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  DownloadOutlined,
  Paid
 ,
} from "@mui/icons-material";

function Layout({ selectedDate,
  setSelectedDate,
  fetchIncome,
  fetchSavings,
  fetchExpenses,
  income,
  savings,
  expenses,}) {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [isLoading, setIsLoading] = useState();
  const data = mockData[0];
  console.log(data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Navbar />
      <Box display="flex">
        <Sidebar />
        <Box flex="1" ml="170px"> {/* Add margin-left to shift content to the right */}
          <FlexBetween>
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
          sx={{
            backgroundColor: theme.palette.secondary.main
          }}
            views={["year", "month"]}
            label="Select Month"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => (
                <TextField
              {...params}
              helperText={null}
            />
            )}
          />
        </LocalizationProvider>
            </Box>
          </FlexBetween>

          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="160px"
            gap="20px"
            sx={{
              "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
            }}
          >
            <StatBox
              title="Total Income"
              value={data && data.totalCustomers}
              increase="+14%"
              description=""
              icon={
                <Paid sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />
              }
            />
            <StatBox
              title="Total Expenses"
              value={data && data.todayStats.totalSales}
              increase="+21%"
              description=""
              icon={
                <Paid sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />
              }
            />
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.secondary.main}
              p="1rem"
              borderRadius="0.55rem"
            >
              <Typography sx={{ color: theme.palette.secondary.main }}> Line Graph</Typography>
            </Box>
            <StatBox
              title="Net Savings"
              value={data && data.thisMonthStats.totalSales}
              increase="+5%"
              description=""
              icon={
                <Paid sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />
              }
            />
            <StatBox
              title="Total Debt"
              value={data && data.yearlySalesTotal}
              increase="+43%"
              description=""
              icon={
                <Paid sx={{ color: theme.palette.secondary.main, fontSize: "26px" }} />
              }
            />
            {/* ROW 2 */}
            <Box
              gridColumn="span 8"
              gridRow="span 3"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  borderRadius: "5rem",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.background.alt,
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${theme.palette.secondary[200]} !important`,
                },
              }}
            >
              <DataGrid
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={(data && data.transactions) || []}
                columns={columns}
              />
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 3"
              backgroundColor={theme.palette.background.alt}
              p="1.5rem"
              borderRadius="0.55rem"
            >
              <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                Sales By Category
              </Typography>
              <BreakdownChart isDashboard={true} />
              <Typography
                p="0 0.6rem"
                fontSize="0.8rem"
                sx={{ color: theme.palette.secondary.main }}
              >
                Breakdown of real states and information via category for revenue
                made for this year and total sales.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
