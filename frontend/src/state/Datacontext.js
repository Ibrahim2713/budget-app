import React, { createContext, useState, useEffect, useMemo } from 'react';
import { fetchIncome, fetchExpenses, fetchSavings } from './apiService';
import { formatDataByMonth } from '../analytics/utils/formatData';
import { getTotalByMonth } from '../analytics/utils/getTotalByMonth';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("income");
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [incomeData, expensesData, savingsData] = await Promise.all([
          fetchIncome(token),
          fetchExpenses(token),
          fetchSavings(token),
        ]);

        setIncome(incomeData);
        setExpenses(expensesData);
        setSavings(savingsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [token]);

  // Memoize filtered data
  const filteredIncome = useMemo(
    () => formatDataByMonth(income, selectedDate),
    [income, selectedDate]
  );

  const filteredExpenses = useMemo(
    () => formatDataByMonth(expenses, selectedDate),
    [expenses, selectedDate]
  );

  const filteredSavings = useMemo(
    () => formatDataByMonth(savings, selectedDate),
    [savings, selectedDate]
  );

  // Memoize totals
  const incomeTotals = useMemo(
    () => getTotalByMonth(income, selectedDate),
    [income, selectedDate]
  );

  const expenseTotals = useMemo(
    () => getTotalByMonth(expenses, selectedDate),
    [expenses, selectedDate]
  );

  const savingsTotals = useMemo(
    () => getTotalByMonth(savings, selectedDate),
    [savings, selectedDate]
  );

  return (
    <DataContext.Provider
      value={{
        income,
        expenses,
        savings,
        filteredIncome,
        filteredExpenses,
        filteredSavings,
        incomeTotals,
        expenseTotals,
        savingsTotals,
        selectedDate,
        setSelectedDate,
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
