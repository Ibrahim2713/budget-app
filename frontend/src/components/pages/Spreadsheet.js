import React, { useState, useContext} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Menu, MenuItem, useTheme, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { DataContext } from "../../state/Datacontext";
import { format, parseISO } from "date-fns";
import AddEntryForm from "../Forms/AddEntryForm";
import AddCategoryForm from "../Forms/AddCategory";


const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    renderCell: (params) => format(parseISO(params.value), "MM/dd/yyyy"),
  },

  {field: "description",
  headerName: "Description",
  flex: 1,
 
}
];

function Spreadsheet() {
  const theme = useTheme();
  const {
    income,
    expenses,
    savings,
    searchTerm,
    setSearchTerm,
    dataView,
    setDataView,
    token,
    handleDeleteEntries,
    handleEditEntries
  } = useContext(DataContext);



  const [anchorEl, setAnchorEl] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isCategoryFormVisible, setCategoryFormVisible] = useState(false);
  const [editEntry, setEditEntry] = useState('')
  const [selectedIds, setSelectedIds] = useState([]); 


 



  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one entry to delete.");
      return;
    }

    try {
      await handleDeleteEntries(selectedIds, dataView, token); // Call the function here
      setSelectedIds([]); // Clear selection after successful deletion
    } catch (error) {
      console.error("Error deleting entries:", error);
    }
  };

  const handleEdit = () => {
    if (selectedIds.length !== 1) {
      alert("Please select exactly one entry to edit.");
      return;
    }
  
    // Proceed with editing
    const entryId = selectedIds[0];
    // Find the entry to edit from the data
    const entryToEdit = filteredData[dataView].find(entry => entry.id === entryId);
    if (entryToEdit) {
      setEditEntry(entryToEdit); // Assuming you have a state to manage the entry being edited
      setFormVisible(true); // Show the form to edit the entry
    }
  };

  const handleSave = async (entry) => {

    try {
      await handleEditEntries(selectedIds, dataView, token, entry);
      setFormVisible(false);
      setEditEntry(null);
    } catch (error) {
      console.error("Error saving entry:", error);
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
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        margin: 0, // Ensure no margin is applied
        padding: 0, 
      }}
    >
          <Box sx={{ flex: 'none', marginBottom: '0' }}>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>
      <Box>
      <Sidebar />
      </Box>
      <Box
        display="flex"
        alignItems="flex-start"
        my={2}
        justifyContent="flex-end"
      >
        <Button
          onClick={handleMenuOpen}
          sx={{ backgroundColor: theme.palette.secondary.main }}
        >
          Data View: {dataView}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              setDataView("Income");
              handleMenuClose();
            }}
          >
            Income
          </MenuItem>
          <MenuItem
            onClick={() => {
              setDataView("Savings");
              handleMenuClose();
            }}
          >
            Savings
          </MenuItem>
          <MenuItem
            onClick={() => {
              setDataView("Expenses");
              handleMenuClose();
            }}
          >
            Expenses
          </MenuItem>
        </Menu>
        <Button
          onClick={() => setFormVisible(true)}
          sx={{
            marginLeft: "1rem",
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          Add Entry
        </Button>
        <Button     
        onClick={() => setCategoryFormVisible(true)}
        sx={{
            marginLeft: "1rem",
            backgroundColor: theme.palette.secondary.main,
          }}>
          Create a Category
        </Button>
        <IconButton
          onClick={handleDelete}
          sx={{
            marginLeft: "1rem",
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.text.primary
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={handleEdit}
          sx={{
            marginLeft: "1rem",
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.text.primary
          }}
        >
          <ModeEditIcon />
        </IconButton>
      </Box>
      {isFormVisible && (
        <AddEntryForm
          dataType={dataView}
          onCancel={() => setFormVisible(false)}
          entryToEdit={editEntry}
          onSave={handleSave}
        />
      )}
       {isCategoryFormVisible && (
        <AddCategoryForm
          open={isCategoryFormVisible}
          onClose={() => setCategoryFormVisible(false)}
          dataType={dataView}
        />
      )}
      <Box
       
      >
        <DataGrid
          getRowId={(row) => row.id} // Make sure row ID is unique
          rows={filteredData[dataView] || []}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          onRowSelectionModelChange={(ids) => {
           setSelectedIds(ids)
          }}
           

          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.secondary.main, // Header background color
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              color: theme.palette.text.primary, // Header text color
            },
            '& .MuiDataGrid-cell': {
              backgroundColor: theme.palette.primary.light, // Cell background color
              color: theme.palette.text.main, // Cell text color
            },
            '& .MuiDataGrid-cell:hover': {
              backgroundColor: theme.palette.secondary.main, // Cell background color on hover
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default Spreadsheet;
