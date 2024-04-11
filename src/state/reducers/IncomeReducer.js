import {combineReducers} from 'redux'
import { EDIT_CELL } from "../actionTypes"







export const initialState = {
    rows: [  { name: 'Salary', goal: 300, actual: 75, difference: 24 },
    { name: `Partner Salary`, goal: 237, actual: 9.0, difference: 37 },
    { name: 'Side Hustle', goal: 262, actual: 16.0, difference: 24 },
    { name: 'Dividends', goal: 305, actual: 3.7, difference: 67 },
    { name: 'Reinbursement', goal: 0, actual: 150, difference: 0 },
    { name: 'Gifts', goal: 0, actual: 0, difference: 0 }

  ],
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
export const expenseState = {
  rows: [  { name: 'Rent', goal: 300, actual: 75, difference: 24 },
  { name: `Groceries`, goal: 237, actual: 9.0, difference: 37 },
  { name: 'Eating Out', goal: 262, actual: 16.0, difference: 24 },
  { name: 'Medical', goal: 305, actual: 3.7, difference: 67 },
  { name: 'Clothes', goal: 0, actual: 150, difference: 0 },
  { name: 'Car', goal: 0, actual: 0, difference: 0 },
  { name: 'Holiday', goal: 0, actual: 0, difference: 0 },
  { name: 'Utilities', goal: 0, actual: 0, difference: 0 }

],
}

function ExpenseReducer(state = expenseState, action) {
  switch(action.type){
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
    income: IncomeReducer,
    expense:ExpenseReducer
})


export default rootReducer