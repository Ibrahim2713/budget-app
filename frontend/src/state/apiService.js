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
  return response.data
}
export const postExpense = async (data,token) => {
  const response = await axios.post(`${BASE_URL}/iexpenses`, data, {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response.data
}
export const postSavings = async (data,token) => {
  const response = await axios.post(`${BASE_URL}/savings`, data,  {
    headers: {Authorization: `Bearer ${token}`}
  })
  return response.data
}
