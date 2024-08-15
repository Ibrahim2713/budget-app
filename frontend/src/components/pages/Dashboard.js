import React, { useContext, useState } from "react";
import FlexBetween from "../FlexBetween";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import CalendarPicker from "../Dashboard/CalanderPicker";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { DataContext } from "../../state/Datacontext";
import ExpenseTable from "../../analytics/charts/ExpenseTable";
import Breakdown from "../Breakdown";

function Dashboard() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    selectedDate,
    setSelectedDate,
    filteredIncome,
    filteredExpenses,
    filteredSavings,
    dataView,
    setDataView,
    expenses,
    searchTerm,
    setSearchTerm
  } = useContext(DataContext);

  const filteredData = {
    Income: filteredIncome,
    Expenses: filteredExpenses,
    Savings: filteredSavings,
  };

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
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Box display="flex">
        <Sidebar />
        <Box flex="1" ml="170px">
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
            <Box gridColumn="span 7">
              <Typography variant="h6" sx={{ color: theme.palette.text.main, mb: 2 }}>
                Quick Actions
              </Typography>
              <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gap="20px"
              >
                <Box
                  gridRow="1 / span 1"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ backgroundColor: theme.palette.primary.main }}
                >
                  <Button>
                    <AddBoxIcon fontSize="large" sx={{ color: theme.palette.income.main }} />
                  </Button>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.text.main }}>
                    Add Income
                  </Typography>
                </Box>

                <Box
                  gridRow="1 / span 1"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ backgroundColor: theme.palette.primary.main }}
                >
                  <Button>
                    <AddBoxIcon fontSize="large" sx={{ color: theme.palette.expenses.main }} />
                  </Button>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.text.main }}>
                    Add Expense
                  </Typography>
                </Box>

                <Box
                  gridRow="1 / span 1"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ backgroundColor: theme.palette.primary.main }}
                >
                  <Button>
                    <AddBoxIcon fontSize="large" sx={{ color: theme.palette.savings.main }} />
                  </Button>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.text.main }}>
                    Add Savings
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Breakdown Section */}
            <Box
              gridRow="1 / span 2"
              gridColumn="9 / span 5"
              sx={{ backgroundColor: theme.palette.primary.main }}
            >
              <Typography variant="h6" sx={{ color: theme.palette.text.main, mb: 2 }}>
                Breakdown
              </Typography>
              <Breakdown />
            </Box>

            <Box
              gridRow="2 / span 4"
              gridColumn="1 / span 7"
              sx={{ backgroundColor: theme.palette.primary.main }}
            >
              <Typography variant="h6" sx={{ color: theme.palette.text.main, mb: 2 }}>
                Transactions
              </Typography>
              <ExpenseTable data={expenses} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
