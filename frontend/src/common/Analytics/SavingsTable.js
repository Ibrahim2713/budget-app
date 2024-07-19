import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

function SavingsTable({data}) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'amount', headerName: 'Amount', width: 150, type: 'number' },
        { field: 'source', headerName: 'Source', width: 150 },
      ];
  return (
    <div>SavingsTable</div>
  )
}

export default SavingsTable