import React, { createContext, useState, useEffect, useMemo } from 'react';
import { fetchIncome, fetchExpenses, fetchSavings, fetchGoals } from './apiService';
import { formatDataByMonth } from '../analytics/utils/formatData';
import { getTotalByMonth } from '../analytics/utils/getTotalByMonth';
import { calculateTotalIncome } from '../analytics/utils/getTotal';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState([]);
  const [goals, setGoals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("income");
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [incomeData, expensesData, savingsData, goalsData] = await Promise.all([
          fetchIncome(token),
          fetchExpenses(token),
          fetchSavings(token),
          fetchGoals(token)
        ]);

        setIncome(incomeData);
        setExpenses(expensesData);
        setSavings(savingsData);
        setGoals(goalsData)
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [token]);

const incomeTotal = useMemo(
  () => calculateTotalIncome(income),
  [income]
)



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
  const incomeTotalsbyMonth = useMemo(
    () => getTotalByMonth(income, selectedDate),
    [income, selectedDate]
  );

  const expenseTotalsbyMonth = useMemo(
    () => getTotalByMonth(expenses, selectedDate),
    [expenses, selectedDate]
  );

  const savingsTotalsbyMonth = useMemo(
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
        incomeTotalsbyMonth,
        expenseTotalsbyMonth,
        savingsTotalsbyMonth,
        selectedDate,
        setSelectedDate,
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        goals,
        setGoals,
        incomeTotal
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
