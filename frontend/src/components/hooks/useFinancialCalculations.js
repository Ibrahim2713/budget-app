import { useMemo } from "react";
import { formatDataByMonth } from "../../analytics/utils/formatData";
import { getTotalByMonth } from "../../analytics/utils/getTotalByMonth";
import {calculateTotalIncome} from "../../analytics/utils/calculateTotalIncome";
import {calculateNetWorth} from "../../analytics/utils/calculateNetworth";
import { startOfMonth, subMonths, endOfMonth } from "date-fns";

export const useFinancialCalculations = (income, expenses, savings, selectedDate) => {

 // Calculate the start and end dates for the previous month
 const previousMonth = subMonths(selectedDate, 1);
 const startOfPreviousMonth = startOfMonth(previousMonth);
 const endOfPreviousMonth = endOfMonth(previousMonth);













  // Memoized filtered data
  const filteredIncome = useMemo(() => formatDataByMonth(income, selectedDate), [income, selectedDate]);
  const filteredExpenses = useMemo(() => formatDataByMonth(expenses, selectedDate), [expenses, selectedDate]);
  const filteredSavings = useMemo(() => formatDataByMonth(savings, selectedDate), [savings, selectedDate]);

  // Memoized totals
  const incomeTotalsbyMonth = useMemo(() => getTotalByMonth(income, selectedDate), [income, selectedDate]);
  const expenseTotalsbyMonth = useMemo(() => getTotalByMonth(expenses, selectedDate), [expenses, selectedDate]);
  const savingsTotalsbyMonth = useMemo(() => getTotalByMonth(savings, selectedDate), [savings, selectedDate]);


   // Memoized totals for the previous month
   const incomeTotalsbyMonthPrevious = useMemo(() => getTotalByMonth(income, previousMonth), [income, previousMonth]);
   const expenseTotalsbyMonthPrevious = useMemo(() => getTotalByMonth(expenses, previousMonth), [expenses, previousMonth]);
   const savingsTotalsbyMonthPrevious = useMemo(() => getTotalByMonth(savings, previousMonth), [savings, previousMonth]);

  // Calculate total income and net worth
  const incomeTotal = useMemo(() => calculateTotalIncome(income), [income]);
  const netWorth = useMemo(() => calculateNetWorth(incomeTotalsbyMonth, expenseTotalsbyMonth, savingsTotalsbyMonth), [incomeTotalsbyMonth, expenseTotalsbyMonth, savingsTotalsbyMonth]);

 // Calculate increase for income, expenses, and savings
 const incomeIncrease = useMemo(() => {
  if (incomeTotalsbyMonthPrevious === 0) return 0;
  return ((incomeTotalsbyMonth - incomeTotalsbyMonthPrevious) / incomeTotalsbyMonthPrevious) * 100;
}, [incomeTotalsbyMonth, incomeTotalsbyMonthPrevious]);

const expenseIncrease = useMemo(() => {
  if (expenseTotalsbyMonthPrevious === 0) return 0;
  return ((expenseTotalsbyMonth - expenseTotalsbyMonthPrevious) / expenseTotalsbyMonthPrevious) * 100;
}, [expenseTotalsbyMonth, expenseTotalsbyMonthPrevious]);

const savingsIncrease = useMemo(() => {
  if (savingsTotalsbyMonthPrevious === 0) return 0;
  return ((savingsTotalsbyMonth - savingsTotalsbyMonthPrevious) / savingsTotalsbyMonthPrevious) * 100;
}, [savingsTotalsbyMonth, savingsTotalsbyMonthPrevious]);


return {
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
};
};
