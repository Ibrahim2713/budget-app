import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function IncomeTable() {


  const data = []
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
    <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
  </div>
  );
  }



export default IncomeTable;
