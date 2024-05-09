import React from "react";
import '../../styles/Dashboard.css'
import Nav from "../../common/Nav/Nav";
import IncomeSection from "../../common/Income/IncomeSection";
import ExpensesSection from "../../common/Expenses/ExpensesSection";
import SavingsSection from "../../common/Savings/SavingsSection";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

/*
// User wants to log transaction
// User wants to filter transactions
// User wants to store and view old transactions/expenses (User wants records and user speacfic data)




*/

function Dashboard() {
const naviagte = useNavigate()

const redirect = () => {
    console.log('workinhg3')
    naviagte('/transactions')
}

    return (
        <div className="dashboard-container">
        <Nav />
            <div className="income-section">
                <h3> Income </h3>
                <IncomeSection />
            </div>
            <div className="expense-section">
                <h3> Expenses</h3>
                <Button variant="outlined" onClick={ () => redirect()}> Log Expenses</Button>
                <ExpensesSection />
            </div>
            <div className="savings-section"> 
                <h3> Savings </h3>
                <SavingsSection />
            </div>

        </div>
    )
}



export default Dashboard