import { EDIT_CELL, EDIT_CELL_EXPENSE, EDIT_CELL_SAVINGS  } from "../actionTypes";


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

  export const editRowSaving = (rowIndex, columnKey, value) => {
    return {
      type: EDIT_CELL_SAVINGS,
      payload: {
        rowIndex,
        columnKey,
        value
      }
    };
  };



