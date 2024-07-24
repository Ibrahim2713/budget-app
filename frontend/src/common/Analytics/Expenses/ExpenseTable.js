import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function ExpenseTable({data}) {


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150, type: 'number' },
    { field: 'category', headerName: 'Category', width: 150 },
  ];
  
  const rows = data.map((item, index) => ({
    id: index + 1,
    ...item,
  }));
  

 

  return (
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
  </div>
  );
  }



export default ExpenseTable;
