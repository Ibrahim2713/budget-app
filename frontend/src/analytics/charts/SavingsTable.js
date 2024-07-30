import React from 'react'
import { useTheme } from '@emotion/react';
import { DataGrid } from '@mui/x-data-grid';

function SavingsTable({data}) {
  const theme = useTheme()

  
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'amount', headerName: 'Amount', width: 150, type: 'number' },
        { field: 'description', headerName: 'Description', width: 150 },
      ];

      const rows = data.map((item, index) => ({
        id: index + 1,
        ...item,
      }));
  return (
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]}  sx={{
          color: theme.palette.secondary.main,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.savings.main + ' !important', // Header background color with !important
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            color: theme.palette.savings.main, // Header text color
          },
          '& .MuiDataGrid-cell': {
            color: theme.palette.secondary.main, // Cell text color
          },
        }} />
  </div>
  )
}

export default SavingsTable