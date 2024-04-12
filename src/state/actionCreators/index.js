import { EDIT_CELL, EDIT_CELL_EXPENSE  } from "../actionTypes";


export const editRow = (rowIndex, columnKey, value) => {
    return {
      type: EDIT_CELL,
      payload: {
        rowIndex,
        columnKey,
        value
      }
    };
  };

  export const editRowExpense = (rowIndex, columnKey, value) => {
    return {
      type: EDIT_CELL_EXPENSE,
      payload: {
        rowIndex,
        columnKey,
        value
      }
    };
  };



