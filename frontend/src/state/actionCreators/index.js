import { EDIT_CELL, EDIT_CELL_EXPENSE, EDIT_CELL_SAVINGS, ADD_TRANSACTION, SET_TRANSACTION  } from "../actionTypes";


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

  export const setTransactions = (transactions) => ({
    type: SET_TRANSACTIONS,
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
       dipsatch()
    }
    catch(error){
      console.error('There was an error posting the transactions!', error);
    }
  }



