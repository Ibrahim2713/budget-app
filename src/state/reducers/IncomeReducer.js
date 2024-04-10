import {combineReducers} from 'redux'
import { EDIT_CELL } from "../actionTypes"







export const initialState = {
    rows: [  { name: 'Food', goal: 300, actual: 75, difference: 24 },
    { name: 'Housing', goal: 237, actual: 9.0, difference: 37 },
    { name: 'Transportation', goal: 262, actual: 16.0, difference: 24 },
    { name: 'Entertainment', goal: 305, actual: 3.7, difference: 67 },],

    editingCell: null
}


function IncomeReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_CELL:
      return {
        ...state,
        rows: state.rows.map((row, index) => {
          if (index === action.payload.rowIndex) {
            return {
              ...row,
              [action.payload.columnKey]: action.payload.value
            };
          }
          return row;
        }),
      };
    default:
      return state;
  }
}


const rootReducer = combineReducers({
    income: IncomeReducer
})


export default rootReducer