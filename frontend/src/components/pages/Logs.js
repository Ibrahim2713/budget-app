import React, { useState, useMemo, useEffect } from "react";
import {
  fetchIncome,
  fetchExpenses,
  fetchSavings,
} from "../../state/actionCreators";
import { connect } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

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
    renderCell: (params) => new Date(params.value).toLocaleDateString(), // Format date to readable string
  },
];

function Logs({
  income,
  expenses,
  savings,
  fetchIncome,
  fetchExpenses,
  fetchSavings,
}) {
  const theme = useTheme();
  const token = localStorage.getItem("token");
  const [dataView, setDataView] = useState("Income");
  const [searchTerm, setSearchTerm] = useState("");
  console.log(expenses);

  useEffect(() => {
    fetchIncome(token);
    fetchSavings(token);
    fetchExpenses(token);
  }, [fetchIncome, fetchSavings, fetchExpenses, token]);

  const gridData = useMemo(() => {
    let data = [];
    switch (dataView) {
      case "Income":
        data = income;
        break;
      case "Expenses":
        data = expenses;
        break;
      case "Savings":
        data = savings;
        break;
      default:
        data = [];
    }
    // Filter data based on searchTerm
    return data.filter(
      (row) =>
        row.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [dataView, income, expenses, savings, searchTerm]);

  // State and handlers for menu
  const [incomeAnchorEl, setIncomeAnchorEl] = useState(null);
  const [savingsAnchorEl, setSavingsAnchorEl] = useState(null);
  const [expensesAnchorEl, setExpensesAnchorEl] = useState(null);

  const handleMenuOpen = (setter) => (event) => {
    setter(event.currentTarget);
  };

  const handleMenuClose = (setter) => () => {
    setter(null);
  };

  return (
    <Box m="1.5rem 2.5" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Sidebar />
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        my={2}
      >
        <div>
          <Button
            onClick={handleMenuOpen(setIncomeAnchorEl)}
            sx={{
              backgroundColor: theme.palette.secondary.light,
            }}
          >
            Income
          </Button>
          <Menu
            anchorEl={incomeAnchorEl}
            open={Boolean(incomeAnchorEl)}
            onClose={handleMenuClose(setIncomeAnchorEl)}
          >
            <MenuItem onClick={handleMenuClose(setIncomeAnchorEl)}>
              Add Income
            </MenuItem>
            <MenuItem onClick={handleMenuClose(setIncomeAnchorEl)}>
              Option 2
            </MenuItem>
            <MenuItem onClick={handleMenuClose(setIncomeAnchorEl)}>
              Option 3
            </MenuItem>
          </Menu>
        </div>
        <div>
          <Button
            onClick={handleMenuOpen(setSavingsAnchorEl)}
            sx={{
              backgroundColor: theme.palette.secondary.light,
            }}
          >
            Savings
          </Button>
          <Menu
            anchorEl={savingsAnchorEl}
            open={Boolean(savingsAnchorEl)}
            onClose={handleMenuClose(setSavingsAnchorEl)}
          >
            <MenuItem onClick={handleMenuClose(setSavingsAnchorEl)}>
              Add Savings
            </MenuItem>
            <MenuItem onClick={handleMenuClose(setSavingsAnchorEl)}>
              Option 2
            </MenuItem>
            <MenuItem onClick={handleMenuClose(setSavingsAnchorEl)}>
              Option 3
            </MenuItem>
          </Menu>
        </div>
        <div>
          <Button
            onClick={handleMenuOpen(setExpensesAnchorEl)}
            sx={{
              backgroundColor: theme.palette.secondary.light,
            }}
          >
            Expenses
          </Button>
          <Menu
            anchorEl={expensesAnchorEl}
            open={Boolean(expensesAnchorEl)}
            onClose={handleMenuClose(setExpensesAnchorEl)}
          >
            <MenuItem onClick={handleMenuClose(setExpensesAnchorEl)}>
              Add Expenses
            </MenuItem>
            <MenuItem onClick={handleMenuClose(setExpensesAnchorEl)}>
              Option 2
            </MenuItem>
            <MenuItem onClick={handleMenuClose(setExpensesAnchorEl)}>
              Option 3
            </MenuItem>
          </Menu>
        </div>
      </Box>
      <Box
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
    </Box>
  );
}

const mapStateToProps = (state) => ({
  income: state.income.income,
  expenses: state.expense.expenses,
  savings: state.savings.savings,
});

const mapDispatchToProps = {
  fetchIncome,
  fetchSavings,
  fetchExpenses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
