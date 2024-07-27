import React, { useState, useEffect } from "react";
import { connect} from "react-redux";
import { fetchIncome, fetchSavings, fetchExpenses, setSelectedDate, setSelectedCategory } from "../state/actionCreators";
import { getTotalByMonth } from "../utils/getTotalByMonth";
import { formatDataByMonth } from "../utils/formatData";
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
import { Box, Button, Typography, useTheme, useMediaQuery, TextField, Menu, MenuItem } from "@mui/material";
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
  const token = localStorage.getItem('token')
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [isLoading, setIsLoading] = useState();
  const [dataView, setDataView] = useState("income");
  const [anchorEl, setAnchorEl] = useState(null);
 
  const data = mockData[0];

  

  
  useEffect(() => {
    fetchIncome(token);
    fetchSavings(token);
    fetchExpenses(token);
  }, [fetchIncome, fetchSavings, fetchExpenses, token]);



  const incomeTotal = getTotalByMonth(income, selectedDate);
  const expensesTotal = getTotalByMonth(expenses, selectedDate);
  const savingsTotal = getTotalByMonth(savings, selectedDate);

const filteredIncome = formatDataByMonth(income, selectedDate);
const filteredExpenses = formatDataByMonth(expenses, selectedDate);
const filteredSavings = formatDataByMonth(savings, selectedDate);





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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                  }}
                  views={["year", "month"]}
                  label="Select Month"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
              <Button onClick={handleMenuClick} variant="contained" color="secondary">
                View: {dataView.charAt(0).toUpperCase() + dataView.slice(1)}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={() => handleMenuItemClick("income")}>Income</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("expenses")}>Expenses</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("savings")}>Savings</MenuItem>
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
              value={`$${incomeTotal.toFixed(2)}`}
              increase="+14%"
              description=""
              icon={
                <Paid
                  sx={{ color: theme.palette.secondary.main, fontSize: "26px" }}
                />
              }
            />
            <StatBox
              title="Total Expenses"
              value={`$${expensesTotal.toFixed(2)}`}
              increase="+21%"
              description=""
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
                data={dataView === "income" ? income: dataView === "expenses" ? expenses : savings} 
                dataKey="amount"
              />
            </Box>
            <StatBox
              title="Net Savings"
              value={`$${savingsTotal.toFixed(2)}`}
              increase="+5%"
              description=""
              icon={
                <Paid
                  sx={{ color: theme.palette.secondary.main, fontSize: "26px" }}
                />
              }
            />
            <StatBox
              title="Total Debt"
              value={data && data.yearlySalesTotal}
              increase="+43%"
              description=""
              icon={
                <Paid
                  sx={{ color: theme.palette.secondary.main, fontSize: "26px" }}
                />
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
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary[100],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.secondary.main,
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary[100],
                  borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${theme.palette.secondary.light} !important`,
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
              backgroundColor={theme.palette.primary.main}
              p="1.5rem"
              borderRadius="0.55rem"
            >
              <Typography
                variant="h6"
                sx={{ color: theme.palette.text.main }}
              >
                Monthly Breakdown
              </Typography>
              <BreakdownChart data={{ income: filteredIncome, expenses: filteredExpenses, savings: filteredSavings }} view={dataView} />
              <Typography
                p="0 0.6rem"
                fontSize="0.8rem"
                sx={{ color: theme.palette.secondary.main }}
              >
                Breakdown of real states and information via category for
                revenue made for this year and total sales.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  selectedDate: state.date.selectedDate,
  selectedCategory: state.dateCategory.category,
  income: state.income.income,
  expenses: state.expense.expenses,
  savings: state.savings.savings,
});

const mapDispatchToProps = {
  setSelectedDate,
  setSelectedCategory,
  fetchIncome,
  fetchSavings,
  fetchExpenses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
