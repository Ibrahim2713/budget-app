// src/context/DataContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetchIncome, fetchExpenses, fetchSavings } from './apiService';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("income");
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [incomeData, expensesData, savingsData] = await Promise.all([
          fetchIncome(token),
          fetchExpenses(token),
          fetchSavings(token),
        ]);

        console.log('im runnning')

        setIncome(incomeData);
        setExpenses(expensesData);
        setSavings(savingsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        income,
        expenses,
        savings,
        selectedDate,
        setSelectedDate,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
