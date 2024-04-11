import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editRow } from '/Users/ibrahim/Desktop/Ibrahim/budget-app/src/state/actionCreators/index.js';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';

function IncomeTable({ rows, editRow }) {
  const [editingCell, setEditingCell] = useState(null);
 
  const handleEdit = (rowIndex, columnKey, value) => {
    editRow(rowIndex, columnKey, value);
  };
 

  const handleCellClick = (rowIndex, columnKey) => {
    setEditingCell({ rowIndex, columnKey });
  };

  const handleBlur = () => {
    setEditingCell(null);
  };

  const inputProps = {
    startAdornment: '$',
    inputProps: {
      style: { textAlign: 'right' },
      pattern: '^[0-9]*$',

    },
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Goal</TableCell>
            <TableCell align="right">Actual</TableCell>
            <TableCell align="right">Difference</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right" onClick={() => handleCellClick(rowIndex, 'goal')}>
                {editingCell?.rowIndex === rowIndex && editingCell?.columnKey === 'goal' ? (
                  <TextField
                    value={row.goal}
                    onChange={(e) => handleEdit(rowIndex, 'goal', e.target.value)}
                    onBlur={handleBlur}
                    InputProps={inputProps}
                  />
                ) : (
                  `$${row.goal}`
                )}
              </TableCell>
              <TableCell align="right" onClick={() => handleCellClick(rowIndex, 'actual')}>
                {editingCell?.rowIndex === rowIndex && editingCell?.columnKey === 'actual' ? (
                  <TextField
                    value={row.actual}
                    onChange={(e) => handleEdit(rowIndex, 'actual', e.target.value)}
                    onBlur={handleBlur}
                    InputProps={inputProps}
                  />
                ) : (
                  `$${row.actual}`
                )}
              </TableCell>
              <TableCell align="right" onClick={() => handleCellClick(rowIndex, 'difference')}> 
                  ${row.actual - row.goal}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => ({
  rows: state.income.rows,
});

const mapDispatchToProps = {
  editRow,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeTable);
