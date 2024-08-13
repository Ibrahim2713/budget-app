import React, { createContext, useState, useEffect, useMemo } from 'react';
import { fetchIncome, fetchExpenses, fetchSavings, fetchGoals, fetchIncomeCategories, fetchSavingsCategories, fetchExpenseCategories, postIncome, postSavings, postExpense, postIncomeCategory,postExpenseCategory, postSavingsCategory, postGoals } from './apiService';
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
  const [dataView, setDataView] = useState("Income")
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
        const updatedIncome = await fetchIncome(token);
        setIncome(updatedIncome); 
      } else if (dataType === 'Expenses') {
        response = await postExpense(newEntry, token);
        await fetchExpenses(token); 
        const updatedExpenses = await fetchExpenses(token); 
        setExpenses(updatedExpenses); 
      } else if (dataType === 'Savings') {
        response = await postSavings(newEntry, token);
        await fetchSavings(token);
        const updatedSavings = await fetchSavings(token); // Update state with new data
        setSavings(updatedSavings);  // Refetch savings
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
        const updatedIncomeCategory = await fetchIncomeCategories(token);
        setIncomeCategory(updatedIncomeCategory)

      } else if (dataType === 'Expenses') {
        response = await postExpenseCategory(category, token);
        const updatedExpensesCategory = await fetchExpenseCategories(token);
        setExpensesCategory(updatedExpensesCategory)

      } else if (dataType === 'Savings') {
        response = await postSavingsCategory(category, token);
        const updatedSavingsCategory = await fetchSavingsCategories(token);
        setSavingsCategory(updatedSavingsCategory)
   
      }
    }
    catch(error) {
     console.error(`Error adding ${dataType} Category:`, error);
      throw error;
    }
  }

  const addGoals = async (data) => {
    try {
      const response = await postGoals(data, token);
      return response;
    }
    catch(error){
      console.error(`Error adding Goal`, error);
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
    savingsIncrease,
    netWorthIncrease
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
        netWorthIncrease,
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
        addCategory,
        addGoals,
        dataView,
        setDataView,
        token
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
