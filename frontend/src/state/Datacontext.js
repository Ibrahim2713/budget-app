import React, { createContext, useState, useEffect } from 'react';
import { fetchUser, fetchIncome, fetchExpenses, fetchSavings, fetchGoals, fetchIncomeCategories, fetchSavingsCategories, fetchExpenseCategories, postIncome, postSavings, postExpense, postIncomeCategory, postExpenseCategory, postSavingsCategory, postGoals, deleteEntries, editEntries, apiRefreshAccessToken } from './apiService';
import { useFinancialCalculations } from '/Users/ibrahim/Desktop/Ibrahim/budget-app/frontend/src/components/hooks/useFinancialCalculations.js';
import { useSnackbar } from 'notistack'; 

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
 
  const [user, setUser] = useState([]);
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
  const [dataView, setDataView] = useState("Income");
  const { enqueueSnackbar } = useSnackbar(); 



  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }, [accessToken, refreshToken]);

  const refreshAccessToken = async () => {
    try {
      const response = await apiRefreshAccessToken(refreshToken); // Pass refreshToken from state
      const newAccessToken = response.token; // Adjust based on the actual structure of the response
      setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      // Handle token refresh error (e.g., log out the user or notify the user)
      return null; // Return null if refresh fails
    }
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        // Attempt to fetch data with the current access token
        const [userData, incomeData, expensesData, savingsData, goalsData, incomeCategory, expensesCategory, savingsCategory] = await Promise.all([
          fetchUser(accessToken),
          fetchIncome(accessToken),
          fetchExpenses(accessToken),
          fetchSavings(accessToken),
          fetchGoals(accessToken),
          fetchIncomeCategories(accessToken),
          fetchExpenseCategories(accessToken),
          fetchSavingsCategories(accessToken)
        ]);
        setUser(userData[0]);
        setIncome(incomeData);
        setExpenses(expensesData);
        setSavings(savingsData);
        setGoals(goalsData);
        setIncomeCategory(incomeCategory);
        setExpensesCategory(expensesCategory);
        setSavingsCategory(savingsCategory);
      } catch (error) {
        if (error.response && error.response.status === 401) { // Unauthorized
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            // Retry loading data with the new access token
            const [userData, incomeData, expensesData, savingsData, goalsData, incomeCategory, expensesCategory, savingsCategory] = await Promise.all([
              fetchUser(newAccessToken),
              fetchIncome(newAccessToken),
              fetchExpenses(newAccessToken),
              fetchSavings(newAccessToken),
              fetchGoals(newAccessToken),
              fetchIncomeCategories(newAccessToken),
              fetchExpenseCategories(newAccessToken),
              fetchSavingsCategories(newAccessToken)
            ]);
            setUser(userData[0]);
            setIncome(incomeData);
            setExpenses(expensesData);
            setSavings(savingsData);
            setGoals(goalsData);
            setIncomeCategory(incomeCategory);
            setExpensesCategory(expensesCategory);
            setSavingsCategory(savingsCategory);
          } else {
            // Handle the case where token refresh fails
            console.error('Token refresh failed. Please log in again.');
          }
        } else {
          console.error('Error loading data:', error);
        }
      }
    };
  
    loadData();
  }, [accessToken]);

  const addEntry = async (dataType, newEntry) => {
    try {
      let response;
      if (dataType === 'Income') {
        response = await postIncome(newEntry, accessToken);
        const updatedIncome = await fetchIncome(accessToken);
        setIncome(updatedIncome); 
      } else if (dataType === 'Expenses') {
        response = await postExpense(newEntry, accessToken);
        const updatedExpenses = await fetchExpenses(accessToken); 
        setExpenses(updatedExpenses); 
      } else if (dataType === 'Savings') {
        response = await postSavings(newEntry, accessToken);
        const updatedSavings = await fetchSavings(accessToken); 
        setSavings(updatedSavings); 
      }
    } catch (error) {
      console.error(`Error adding ${dataType} entry:`, error);
      throw error;
    }
  };

  const addCategory = async (dataType, category) => {
    try {
      let response;
      if (dataType === 'Income') {
        response = await postIncomeCategory(category, accessToken);
        const updatedIncomeCategory = await fetchIncomeCategories(accessToken);
        setIncomeCategory(updatedIncomeCategory);
      } else if (dataType === 'Expenses') {
        response = await postExpenseCategory(category, accessToken);
        const updatedExpensesCategory = await fetchExpenseCategories(accessToken);
        setExpensesCategory(updatedExpensesCategory);
      } else if (dataType === 'Savings') {
        response = await postSavingsCategory(category, accessToken);
        const updatedSavingsCategory = await fetchSavingsCategories(accessToken);
        setSavingsCategory(updatedSavingsCategory);
      }
    } catch (error) {
      console.error(`Error adding ${dataType} Category:`, error);
      throw error;
    }
  }

  const addGoals = async (data) => {
    try {
      const response = await postGoals(data, accessToken);
      const updatedGoals = await fetchGoals(accessToken);
      setGoals(updatedGoals);
    } catch (error) {
      console.error(`Error adding Goal`, error);
      throw error;
    }
  }

  const handleDeleteEntries = async (selectedIds) => {
    try {
      await deleteEntries(selectedIds, dataView, accessToken);
      if (dataView === "Income") {
        const updated = await fetchIncome(accessToken);
        setIncome(updated);
      } else if (dataView === "Savings") {
        const updated = await fetchSavings(accessToken);
        setSavings(updated);
      } else if (dataView === "Expenses") {
        const updated = await fetchExpenses(accessToken);
        setExpenses(updated);
      }
      enqueueSnackbar("Entries deleted successfully!", { variant: 'success' });
    } catch (error) {
      console.error("Error deleting entries:", error);
      enqueueSnackbar("Failed to delete entries.", { variant: 'error' });
    }
  };

  const handleEditEntries = async (selectedIds, dataView, data) => {
    try {
      await editEntries(selectedIds, dataView, accessToken, data);
      if (dataView === "Income") {
        const updated = await fetchIncome(accessToken);
        setIncome(updated);
        enqueueSnackbar("Entries updated successfully!", { variant: 'success' });
      } else if (dataView === "Savings") {
        const updated = await fetchSavings(accessToken);
        setSavings(updated);
        enqueueSnackbar("Entries updated successfully!", { variant: 'success' });
      } else if (dataView === "Expenses") {
        const updated = await fetchExpenses(accessToken);
        setExpenses(updated);
        enqueueSnackbar("Entries updated successfully!", { variant: 'success' });
      }
    } catch (error) {
      console.error("Error updating entries:", error);
      enqueueSnackbar("Failed to update entries.", { variant: 'error' });
    }
  };

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
        user,
        setUser,
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
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        handleDeleteEntries,
        handleEditEntries
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
