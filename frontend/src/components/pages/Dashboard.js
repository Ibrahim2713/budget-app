import React, { useContext, useMemo, useState } from "react";
import FlexBetween from "../FlexBetween";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import CalendarPicker from "../Dashboard/CalanderPicker";
import StatBox from "../Dashboard/StatBox";
import OverviewChart from "../../analytics/charts/OverviewChart";
import BreakdownChart from "../../analytics/charts/BreakdownChart";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Paid } from "@mui/icons-material";
import { DataContext } from "../../state/Datacontext";

function Dashboard() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    income,
    expenses,
    savings,
    selectedDate,
    setSelectedDate,
    filteredIncome,
    filteredExpenses,
    filteredSavings,
    incomeTotalsbyMonth,
    expenseTotalsbyMonth,
    savingsTotalsbyMonth,
    incomeIncrease,
    expenseIncrease,
    savingsIncrease,
    dataView,
    setDataView
  } = useContext(DataContext);

  const filteredData = {
    Income: filteredIncome,
    Expenses: filteredExpenses,
    Savings: filteredSavings,
  };

  const totalData = {
    Income: incomeTotalsbyMonth,
    Expenses: expenseTotalsbyMonth,
    Savings: savingsTotalsbyMonth,
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`, // Format amount as currency
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        new Date(params.value).toLocaleDateString();
      }, // Format date to readable string
    },
  ];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (view) => {
    setDataView(view);
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const gridData = useMemo(() => {
    switch (dataView) {
      case "Income":
        return filteredData.Income;
      case "Expenses":
        return filteredData.Expenses;
      case "Savings":
        return filteredData.Savings;
      default:
        return [];
    }
  }, [
    dataView,
    filteredData.Income,
    filteredData.Expenses,
    filteredData.Savings,
  ]);

  return (
    
    <Box m="1.5rem 2.5" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Navbar />
      <Box display="flex">
        <Sidebar />
        <Box flex="1" ml="170px">
          {" "}
          {/* Add margin-left to shift content to the right */}
          <FlexBetween>
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            <Box display="flex" gap={5}>
              <CalendarPicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <Button
                onClick={handleMenuClick}
                variant="contained"
                color="secondary"
              >
                View: {dataView.charAt(0).toUpperCase() + dataView.slice(1)}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={() => handleMenuItemClick("Income")}>
                  Income
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Expenses")}>
                  Expenses
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Savings")}>
                  Savings
                </MenuItem>
              </Menu>
            </Box>
          </FlexBetween>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="160px"
            gap="20px"
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreens ? undefined : "span 12",
              },
            }}
          >
            <StatBox
              title="Total Income"
              value={`$${totalData.Income.toFixed(2)}`}
              increase={`+${incomeIncrease.toFixed(2)}%`}
              description="Increase from last month"
              icon={
                <Paid
                  sx={{ color: theme.palette.secondary.main, fontSize: "26px" }}
                />
              }
            />
            <StatBox
              title="Total Expenses"
              value={`$${totalData.Expenses.toFixed(2)}`}
              increase={`+${expenseIncrease.toFixed(2)}%`}
              description="Increase from last month"
              icon={
                <Paid
                  sx={{ color: theme.palette.secondary.main, fontSize: "26px" }}
                />
              }
            />
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.main}
              p="1rem"
              borderRadius="0.55rem"
            >
              <OverviewChart
                isDashboard={true}
                view={dataView}
                data={
                  dataView === "Income"
                    ? income
                    : dataView === "Expenses"
                    ? expenses
                    : savings
                }
                dataKey="amount"
              />
            </Box>
            <StatBox
              title="Net Savings"
              value={`$${totalData.Savings.toFixed(2)}`}
              increase={`+${savingsIncrease.toFixed(2)}%`}
              description="Increase from last month"
              icon={
                <Paid
                  sx={{ color: theme.palette.secondary.main, fontSize: "26px" }}
                />
              }
            />
            {/* Placeholder */}

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
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.main,
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.primary.main,
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.primary.main,
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.main,
                  borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${theme.palette.text.main} !important`,
                },
              }}
            >
              <DataGrid
                getRowId={(row) => row.id}
                rows={gridData}
                columns={columns}
              />
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 3"
              backgroundColor={theme.palette.primary.main}
              p="1.5rem"
              borderRadius="0.55rem"
            >
              <Typography variant="h6" sx={{ color: theme.palette.text.main }}>
                {`Breakdown of Monthly ${dataView}`}
              </Typography>
              <BreakdownChart
                data={{
                  income: filteredData.Income,
                  expenses: filteredData.Expenses,
                  savings: filteredData.Savings,
                }}
                view={dataView}
              />
              <Typography
                p="0 0.6rem"
                fontSize="0.8rem"
                sx={{ color: theme.palette.secondary.main }}
              ></Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
   
  );
}

export default Dashboard;
