import {combineReducers} from 'redux'
import {  SET_INCOME, ADD_INCOME, SET_DATE, SET_CATEGORY, SET_SAVINGS, ADD_SAVINGS, SET_EXPENSE,ADD_EXPENSE } from "../actionTypes"







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

export const SavingsState = {
  savings: []
}



function SavingsReducer(state = SavingsState , action) {
  switch(action.type){
    case SET_SAVINGS:
      return {
        ...state,
          savings: action.payload
          }
      case ADD_SAVINGS:
        return {
          ...state,
          savings: [...state.savings, action.payload]
        }
    default:
      return state;
  }
}

 export const expensesState = {
  expenses: []
 }

function ExpenseReducer(state = expensesState, action) {
  switch(action.type){
    case SET_EXPENSE:
      return{
        ...state,
        expenses: action.payload
      };
      case ADD_EXPENSE:
        return {
          ...state,
          expenses: [...state.expenses, action.payload]
        }
        default : 
        return state
  }
}


export const dateState = {
  selectedDate: new Date()
}

function DateReducer(state  = dateState, action){
  switch(action.type){
    case SET_DATE:
      return {
        ...state,
          selectedDate: action.payload
      }
    default:
      return state
  }
}

export const categoryState =  {
  category: 'income'
}

function DateCategoryReducer  (state = categoryState, action) {
  switch(action.type){
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      }
    default:
      return state
  }
}




const rootReducer = combineReducers({
    income: IncomeReducer,
    expense:ExpenseReducer,
    savings: SavingsReducer,
    date: DateReducer,
    dateCategory: DateCategoryReducer

})


export default rootReducer