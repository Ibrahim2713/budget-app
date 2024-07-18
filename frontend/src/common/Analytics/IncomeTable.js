import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editRow } from '../../state/actionCreators/index'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function IncomeTable({data}) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150, type: 'number' },
    { field: 'source', headerName: 'Source', width: 150 },
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
