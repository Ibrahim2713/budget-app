import React,{useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import { connect } from "react-redux";
import { editRowExpense} from "../../state/actionCreators";


function ExpensesTable({rows, editRowExpense}) {
  const [editingCell, setEditingCell] = useState(null);

  const handleEdit = (rowIndex, columnKey, value) => {
    editRowExpense(rowIndex, columnKey, value);
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
            <TableCell> Expense Category</TableCell>
            <TableCell align="right">Budget</TableCell>
            <TableCell align="right"> Actual&nbsp;(g)</TableCell>
            <TableCell align="right"> Difference&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
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
  rows: state.expense.rows,
});

const mapDispatchToProps = {
  editRowExpense
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
