import React, { createContext, useState, useEffect, useMemo } from 'react';
import { fetchIncome, fetchExpenses, fetchSavings, fetchGoals, fetchIncomeCategories, fetchSavingsCategories, fetchExpenseCategories, postIncome, postSavings, postExpense, postIncomeCategory,postExpenseCategory, postSavingsCategory } from './apiService';
import {useFinancialCalculations} from '/Users/ibrahim/Desktop/Ibrahim/budget-app/frontend/src/components/hooks/useFinancialCalculations.js'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState([]);
  const [incomeCategory, setIncomeCategory] = useState([]);
  const [expensesCategory, setExpensesCategory] = useState([]);
  const [savingsCategory, setSavingsCategory] = useState([]);
  const [goals, setGoals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("income");
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [incomeData, expensesData, savingsData, goalsData, incomeCategory, expensesCategory, savingsCategory] = await Promise.all([
          fetchIncome(token),
          fetchExpenses(token),
          fetchSavings(token),
          fetchGoals(token),
          fetchIncomeCategories(token),
          fetchExpenseCategories(token),
          fetchSavingsCategories(token)

        ]);

        setIncome(incomeData);
        setExpenses(expensesData);
        setSavings(savingsData);
        setGoals(goalsData);
        setIncomeCategory(incomeCategory);
        setExpensesCategory(expensesCategory);
        setSavingsCategory(savingsCategory);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [token]);


  const addEntry = async (dataType, newEntry) => {
    try {
      let response;
      if (dataType === 'Income') {
        response = await postIncome(newEntry, token);
        await fetchIncome(token); // Refetch income
      } else if (dataType === 'Expenses') {
        response = await postExpense(newEntry, token);
        await fetchExpenses(token); // Refetch expenses
      } else if (dataType === 'Savings') {
        response = await postSavings(newEntry, token);
        await fetchSavings(token); // Refetch savings
      }
    } catch (error) {
      console.error(`Error adding ${dataType} entry:`, error);
      throw error;
    }
  };

  const addCategory =  async (dataType, category) => {
      
    try {
      let response;
      if (dataType === 'Income') {
        response = await postIncomeCategory(category, token);

      } else if (dataType === 'Expenses') {
        response = await postExpenseCategory(category, token);

      } else if (dataType === 'Savings') {
        response = await postSavingsCategory(category, token);
   
      }
    }
    catch(error) {
     console.error(`Error adding ${dataType} Category:`, error);
      throw error;
    }
  }
  

  const {
    filteredIncome,
    filteredExpenses,
    filteredSavings,
    incomeTotalsbyMonth,
    expenseTotalsbyMonth,
    savingsTotalsbyMonth,
    incomeTotal,
    netWorth,
    incomeIncrease,
    expenseIncrease,
    savingsIncrease
  } = useFinancialCalculations(income, expenses, savings, selectedDate);



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
        incomeIncrease,
        expenseIncrease,
        savingsIncrease,
        selectedDate,
        setSelectedDate,
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        goals,
        setGoals,
        incomeTotal,
        netWorth,
        incomeCategory,
        expensesCategory,
        savingsCategory,
        setIncome,
        setSavings,
        setExpenses,
        addEntry,
        addCategory
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
