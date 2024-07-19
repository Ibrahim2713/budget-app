import {  SET_INCOME, ADD_INCOME, SET_DATE, SET_CATEGORY, SET_SAVINGS, ADD_SAVINGS, SET_EXPENSE, ADD_EXPENSE  } from "../actionTypes";
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


export const setSavings = (savings) => ({
  type: SET_SAVINGS,
  payload: savings

})

export const addSavings = (savings) => ({
  type: ADD_SAVINGS,
  payload: savings
})

export const fetchSavings = (token) => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8000/api/savings', {
      headers: {
        authorization: token
      }
    })
    dispatch(setSavings(response.data))
  }
  catch(error) {
    console.error('There was an error fetching the savings!', error);
  }
}


export const postSavings = (token, data) => async (dipsatch) => {
  try {
    const response =  axios.post('http://localhost:8000/api/savings', data, {
      headers: {
        authorization: token
      }
     } )
     dipsatch(setSavings(response.data))
  }
  catch(error){
    console.error('There was an error posting the savings!', error);
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





  export const setExpenses = (expenses) => ({
    type: SET_EXPENSE,
    payload: expenses,
  });
  
  export const addExpenses = (expenses) => ({
    type: ADD_EXPENSE,
    payload: expenses,
  });

  export const fetchExpenses = (token) =>  async (dipsatch) => {
    try {
     const response = await axios.get('http://localhost:8000/api/expenses', {
        headers: {
          authorization: token
        }
      })
      dipsatch(setExpenses(response.data))
    }
    catch(error) {
      console.error('There was an error fetching the expenses!', error);
    }
  }

  export const postExpenses = (token, data) => async (dipsatch) => {
    try {
      const response =  axios.post('http://localhost:8000/api/expenses', data, {
        headers: {
          authorization: token
        }
       } )
       dipsatch(addExpenses(response.data))
    }
    catch(error){
      console.error('There was an error posting the expenses!', error);
    }
  }



