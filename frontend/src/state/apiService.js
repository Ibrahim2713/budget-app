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
