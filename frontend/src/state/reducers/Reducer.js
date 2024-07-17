import {combineReducers} from 'redux'
import { EDIT_CELL, EDIT_CELL_EXPENSE, EDIT_CELL_SAVINGS, SET_TRANSACTION, ADD_TRANSACTION, SET_INCOME, ADD_INCOME } from "../actionTypes"







export const initialState = {
  income : []
}


function IncomeReducer(state = initialState, action) {
  switch (action.type) {
    case 
      SET_INCOME:
        return {
          ...state,
          income: action.payload
        }
        case ADD_INCOME:
          return {
            ...state,
            income: [...state.income, action.payload]
          }

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
    case EDIT_CELL_EXPENSE:
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

export const SavingsState = {
  rows: [  { name: 'Emeregency Fund', goal: 300, actual: 75, difference: 24 },
  { name: `College Fund`, goal: 237, actual: 9.0, difference: 37 },
  { name: 'Retirement', goal: 262, actual: 16.0, difference: 24 },
  { name: 'Renovations', goal: 305, actual: 3.7, difference: 67 },
  { name: 'Holidays', goal: 0, actual: 150, difference: 0 },
  { name: 'Gifts', goal: 0, actual: 0, difference: 0 },
],
}

function SavingsReducer(state = SavingsState , action) {
  switch(action.type){
    case EDIT_CELL_SAVINGS:
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

 export const transactionState = {
  transactions: []
 }

function TransactionReducer(state = transactionState, action) {
  switch(action.type){
    case SET_TRANSACTION:
      return{
        ...state,
        transactions: action.payload
      };
      case ADD_TRANSACTION:
        return {
          ...state,
          transactions: [...state.transactions, action.payload]
        }
        default : 
        return state
  }
}




const rootReducer = combineReducers({
    income: IncomeReducer,
    expense:ExpenseReducer,
    savings: SavingsReducer,
    transactions: TransactionReducer

})


export default rootReducer