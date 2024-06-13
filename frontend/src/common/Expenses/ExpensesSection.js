import React from "react";
import "./Expenses.css";
import ExpensesTable from "../Analytics/ExpensesTable";
import ExpensesOverview from "./ExpensesOverview";
import ExpensesLineChart from "../Analytics/ExpensesLineChart";
import ExpensesBreakdown from "../Analytics/ExpensesBreakdown";

function ExpensesSection() {
  return (
    <div className="expenses-container">
      <div className="expenses-table-container">
        <ExpensesTable />
      </div>
      <div className="expenses-overview-container">
        <ExpensesOverview />
        <ExpensesLineChart />
      </div>
      <div className="expenses-visual-container">
        <ExpensesBreakdown />
      </div>
    </div>
  );
}

export default ExpensesSection;
