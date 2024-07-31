import React, { useState, useContext } from "react";
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

const columns = [
  { field: "_id", headerName: "ID", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 1, renderCell: (params) => `$${Number(params.value).toFixed(2)}` },
  { field: "date", headerName: "Date", flex: 1,  renderCell: (params) => format(parseISO(params.value), "MM/dd/yyyy")},
];

function Logs() {
  const theme = useTheme();
  const {
    income,
    expenses,
    savings,
    selectedDate,
    setSelectedDate,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,

  } = useContext(DataContext);


 
  
  const [dataView, setDataView] = useState("Income");

  // State and handlers for menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


 // Filter data based on searchTerm
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
    <Box m="1.5rem 2.5rem" sx={{   backgroundColor: theme.palette.primary.main,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',  // Ensure full viewport height
      overflow: 'hidden', 
      }}>
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
            onClick={handleMenuOpen}
            sx={{ backgroundColor: theme.palette.secondary.light }}
          >
            {dataView}
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
        </div>
      </Box>
      <Box
        sx={{
          "& .MuiDataGrid-root": { border: "none", borderRadius: "5rem" },
          "& .MuiDataGrid-cell": { borderBottom: "none", backgroundColor: theme.palette.primary.main, color: theme.palette.text.main },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: theme.palette.primary.main, borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: theme.palette.primary.main },
          "& .MuiDataGrid-footerContainer": { backgroundColor: theme.palette.primary.main, color: theme.palette.text.main, borderTop: "none" },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${theme.palette.text.main} !important` },
        }}
      >
        <DataGrid
          getRowId={(row) => row.id}
          rows={filteredData[dataView] || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default Logs;
