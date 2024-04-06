import React, {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const initialRows = [
    { name: 'Food', goal: 300, actual: 75, difference: 24 },
    { name: 'Housing', goal: 237, actual: 9.0, difference: 37 },
    { name: 'Transportation', goal: 262, actual: 16.0, difference: 24 },
    { name: 'Entertainment', goal: 305, actual: 3.7, difference: 67 },
  ];

  




  



function IncomeTable() {
  const [rows,setRows] = useState(initialRows)
  const [editingCell, setEditingCell] = useState(null)
  const handleEdit = (rowIndex, columnKey, value) => {
    const newRows = [...rows];
    newRows[rowIndex][columnKey] = value;
    setRows(newRows);
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
                {editingCell?.rowIndex === rowIndex && editingCell?.columnKey === 'difference' ? (
                  <TextField
                    value={row.difference}
                    onChange={(e) => handleEdit(rowIndex, 'difference', e.target.value)}
                    onBlur={handleBlur}
                    InputProps={inputProps}
                  />
                ) : (
                  `$${row.difference}`
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}



export default IncomeTable