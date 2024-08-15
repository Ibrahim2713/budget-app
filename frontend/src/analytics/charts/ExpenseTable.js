import React, {useContext} from 'react';
import { useTheme } from '@emotion/react';
import { DataGrid } from '@mui/x-data-grid';
import { format, parseISO } from "date-fns";
import { DataContext } from '../../state/Datacontext';
import { Box, TextField } from '@mui/material';

function ExpenseTable({data}) {
  const theme = useTheme();
  const { searchTerm, setSearchTerm } = useContext(DataContext);

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

   // Filter data based on search term
   const filteredData = data.filter(
    (row) =>
      row.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.description.toLowerCase().includes(searchTerm.toLowerCase())
  );



  
 
  

 

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box mb={2}>
        <TextField
          label="Search Transactions"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: theme.palette.text.main,
            color: 'black'
          }}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          getRowId={(row) => row.id}
          rows={filteredData || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{
            color: theme.palette.text.main,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'black'
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              color: 'black',
            },
            '& .MuiDataGrid-cell': {
              color: theme.palette.text.main,
            },
          }}
        />
      </Box>
    </Box>
  );
  }



export default ExpenseTable;
