import React, {useEffect} from "react";
import { connect } from "react-redux";
import '../../styles/Dashboard.css'
import Nav from "../../common/Nav/Nav";
import IncomeSection from "../../common/Income/IncomeSection";
import ExpensesSection from "../../common/Expenses/ExpensesSection";
import SavingsSection from "../../common/Savings/SavingsSection";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { fetchTransactions } from "../../state/actionCreators";

 /* User Wants to be able to use visual represntations of financial data based on the month that they select */

function Dashboard({fetchTransactions, transactions}) {

    const token = localStorage.getItem('token')
  
    useEffect(() => {
      if (token) {
        fetchTransactions(token);
      }
    }, [token]);

const naviagte = useNavigate()

const redirect = () => {
    
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

const mapStateToProps = (state) => ({
    transactions : state.transactions.transactions
  })

  const mapDispatchToProps =  {
    fetchTransactions,
  }


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)