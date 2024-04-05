import React from "react";
import './Expenses.css'
import ExpensesTable from "../visualData/ExpensesTable";
import ExpensesOverview from "./ExpensesOverview";
import ExpensesLineChart from "../visualData/ExpensesLineChart";
import ExpensesBreakdown from "../visualData/ExpensesBreakdown";

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
    )
}




export default ExpensesSection