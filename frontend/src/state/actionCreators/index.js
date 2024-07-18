import { EDIT_CELL, EDIT_CELL_EXPENSE, EDIT_CELL_SAVINGS, ADD_TRANSACTION, SET_TRANSACTION, SET_INCOME, ADD_INCOME, SET_DATE, SET_CATEGORY  } from "../actionTypes";
import axios from "axios";

export const setIncome = (income) => ({
  type: SET_INCOME,
  payload: income,
});

export const addIncome = (income) => ({
  type: ADD_INCOME,
  payload: income,
});


export const fetchIncome = (token) => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8000/api/income', {
      headers: {
        authorization: token
      }
    })
    dispatch(setIncome(response.data))
  }
  catch(error) {
    console.error('There was an error fetching the income!', error);
  }
}

export const postIncome = (token, data) => async (dipsatch) => {
  try {
    const response =  axios.post('http://localhost:8000/api/income', data, {
      headers: {
        authorization: token
      }
     } )
     dipsatch(setIncome(response.data))
  }
  catch(error){
    console.error('There was an error posting the income!', error);
  }
}


export const setSelectedDate = (date) => ({
  type: SET_DATE,
  payload: date
})


export const setSelectedCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category
})





  export const setTransactions = (transactions) => ({
    type: SET_TRANSACTION,
    payload: transactions,
  });
  
  export const addTransaction = (transaction) => ({
    type: ADD_TRANSACTION,
    payload: transaction,
  });

  export const fetchTransactions = (token) =>  async (dipsatch) => {
    try {
     const response = await axios.get('http://localhost:8000/api/transactions', {
        headers: {
          authorization: token
        }
      })
      dipsatch(setTransactions(response.data))
    }
    catch(error) {
      console.error('There was an error fetching the transactions!', error);
    }
  }

  export const postTransaction = (token, data) => async (dipsatch) => {
    try {
      const response =  axios.post('http://localhost:8000/api/transactions', data, {
        headers: {
          authorization: token
        }
       } )
       dipsatch(addTransaction(response.data))
    }
    catch(error){
      console.error('There was an error posting the transactions!', error);
    }
  }



