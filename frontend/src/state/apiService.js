import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'

export const fetchIncome = async (token) => {
  const response = await axios.get(`${BASE_URL}/income`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchExpenses = async (token) => {
  const response = await axios.get(`${BASE_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchSavings = async (token) => {
  const response = await axios.get(`${BASE_URL}/savings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const fetchGoals = async (token) => {
  const response = await axios.get(`${BASE_URL}/goals`, {
    headers: {Authorization: `Bearer ${token}`}
  });
  return response.data;
}
export const postIncome = async (data, token) => {
  const response = await axios.post(`${BASE_URL}/income`, data, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response
}
export const postExpense = async (data,token) => {
  const response = await axios.post(`${BASE_URL}/expenses`, data, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response
}
export const postSavings = async (data,token) => {
  const response = await axios.post(`${BASE_URL}/savings`, data,  {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response
}

export const postGoals = async (data, token) => {
  const response = await axios.post(`${BASE_URL}/goals`, data, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response
}

export const fetchExpenseCategories = async(token ) => {
  const response = await axios.get(`${BASE_URL}/expense-categories`, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response.data
}

export const fetchIncomeCategories = async(token ) => {
  const response = await axios.get(`${BASE_URL}/income-categories`, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response.data
}

export const fetchSavingsCategories = async(token ) => {
  const response = await axios.get(`${BASE_URL}/savings-categories`, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response.data
}

export const postIncomeCategory = async (data, token) => {
  const response = await axios.post(`${BASE_URL}/income-categories`, data, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response
}

export const postExpenseCategory = async (data, token) => {
  const response = await axios.post(`${BASE_URL}/expense-categories`, data, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response
}
export const postSavingsCategory = async (data, token) => {
  const response = await axios.post(`${BASE_URL}/savings-categories`, data, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response
}

export const deleteIncome = async (data, token) => {
  const response = await axios.delete(`${BASE_URL}/income`,data, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response
}

export const deleteSavings = async (data, token) => {
  const response = await axios.delete(`${BASE_URL}/savings`,data, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response
}

export const deleteExpense = async (data, token) => {
  const response = await axios.delete(`${BASE_URL}/expenses`,data, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response
}


export const deleteEntries = async (ids, dataType, token) => {
  try {
    const endpoint = `${BASE_URL}/${dataType.toLowerCase()}`;
    const response = await axios.delete(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
      data: { id: ids }, // Ensure that the data is part of the request configuration
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting entries:", error);
    throw error;
  }
};



