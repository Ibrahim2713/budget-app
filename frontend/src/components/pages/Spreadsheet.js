import React, { useState, useContext, useEffect } from "react";
import { fetchExpenseCategories } from "../../state/apiService";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { DataContext } from "../../state/Datacontext";
import { format, parseISO } from "date-fns";
import AddEntryForm from '../AddEntryForm';

const columns = [
  { field: "_id", headerName: "ID", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 1, renderCell: (params) => `$${Number(params.value).toFixed(2)}` },
  { field: "date", headerName: "Date", flex: 1, renderCell: (params) => format(parseISO(params.value), "MM/dd/yyyy")},
];



function Spreadsheet() {


 
  const theme = useTheme();
  const {
    income,
    expenses,
    savings,
    setIncome,
    setExpenses,
    setSavings,
    searchTerm,
    setSearchTerm,
    postIncome,
    postExpense,postSavings
  } = useContext(DataContext);

  const [dataView, setDataView] = useState("Income");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddEntry = async (newEntry) => {
    try {
      let response;
  
      if (dataView === "Income") {
        response = await postIncome(newEntry); // Assuming this returns the new entry
      } else if (dataView === "Expenses") {
        response = await postExpense(newEntry);
      } else if (dataView === "Savings") {
        response = await postSavings(newEntry);
      }
  
      // Assuming the response contains the new entry with the backend-assigned ID
      const createdEntry = response.data;
  
      // Update the local state with the new entry
      if (dataView === "Income") {
        setIncome((prev) => [...prev, createdEntry]);
      } else if (dataView === "Expenses") {
        setExpenses((prev) => [...prev, createdEntry]);
      } else if (dataView === "Savings") {
        setSavings((prev) => [...prev, createdEntry]);
      }
  
      setFormVisible(false);
    } catch (error) {
      console.error("Error adding entry:", error);
      // Optionally handle error here, e.g., show a notification
    }
  };
  

  const filteredData = {
    Income: income.filter((row) =>
      row.category?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    Expenses: expenses.filter((row) =>
      row.category?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    Savings: savings.filter((row) =>
      row.category?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  };

  return (
    <Box
      m="1.5rem 2.5rem"
      sx={{ 
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Sidebar />
      <Box
        display="flex"
        alignItems="flex-start"
        my={2}
        justifyContent="flex-end"
      >
        <Button
          onClick={handleMenuOpen}
          sx={{ backgroundColor: theme.palette.secondary.light }}
        >
          Data View
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { setDataView("Income"); handleMenuClose(); }}>Income</MenuItem>
          <MenuItem onClick={() => { setDataView("Savings"); handleMenuClose(); }}>Savings</MenuItem>
          <MenuItem onClick={() => { setDataView("Expenses"); handleMenuClose(); }}>Expenses</MenuItem>
        </Menu>
        <Button
          onClick={() => setFormVisible(true)}
          sx={{ marginLeft: '1rem', backgroundColor: theme.palette.secondary.light }}
        >
          Add New
        </Button>
      </Box>
      {isFormVisible && (
        <AddEntryForm
          dataType={dataView}
          onAdd={handleAddEntry}
          onCancel={() => setFormVisible(false)}
        />
      )}
      <Box
        sx={{
          "& .MuiDataGrid-root": { border: "none", borderRadius: "5rem" },
          "& .MuiDataGrid-cell": { borderBottom: "none", backgroundColor: theme.palette.primary.main, color: theme.palette.text.main },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: theme.palette.secondary.main, borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: theme.palette.primary.main },
          "& .MuiDataGrid-footerContainer": { backgroundColor: theme.palette.primary.main, color: theme.palette.text.main, borderTop: "none" },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${theme.palette.text.main} !important` },
        }}
      >
        <DataGrid
          getRowId={(row) => row.id} // Make sure row ID is unique
          rows={filteredData[dataView] || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default Spreadsheet;
