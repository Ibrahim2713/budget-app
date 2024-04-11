import { EDIT_CELL, CELL_CLICKED  } from "../actionTypes";


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


