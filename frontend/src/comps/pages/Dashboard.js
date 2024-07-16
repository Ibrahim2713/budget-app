import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import '../../styles/Dashboard.css'
import Nav from "../../common/Nav/Nav";
import IncomeSection from "../../common/Income/IncomeSection";
import ExpensesSection from "../../common/Expenses/ExpensesSection";
import SavingsSection from "../../common/Savings/SavingsSection";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Modal } from "@mui/material";
import { fetchTransactions } from "../../state/actionCreators";
import IncomeForm from "./IncomeForm";
import ExpensesForm from "./ExpenseForm";
import SavingsForm from "./SavingsForm";
import CategoryForm from "./CategoryForm";
 /* User Wants to be able to use visual represntations of financial data based on the month that they select */

function Dashboard({fetchTransactions, transactions}) {
    const [modalState, setModalState] = useState({
        income: false,
        expenses: false,
        savings: false,
        category: false
      });
    
      const handleOpenModal = (modal) => setModalState({ ...modalState, [modal]: true });
      const handleCloseModal = (modal) => setModalState({ ...modalState, [modal]: false });
  


    const token = localStorage.getItem('token')
  
    useEffect(() => {
      if (token) {
        fetchTransactions(token);
      }
    }, [token]);


    return (
        <div className="dashboard-container">
        <Nav />
            <div className="income-section">
                <h3> Income </h3>
                <Button variant="outlined" onClick={ () =>handleOpenModal('income')}>  Log Income </Button>
                <IncomeSection />
            </div>
            <div className="expense-section">
                <h3> Expenses</h3>
                <Button variant="outlined" onClick={ () => handleOpenModal('expenses')}> Log Expenses</Button>
                <Button variant="outlined" onClick= { () => handleOpenModal('category')}> Create Category</Button>
                <ExpensesSection />
            </div>
            <div className="savings-section"> 
                <h3> Savings </h3>
                <Button variant="outlined" onClick={() => handleOpenModal('savings')}> Log Savings</Button>
                <SavingsSection />
            </div>
        <IncomeForm open={modalState.income} handleClose={() => handleCloseModal('income')} />
      <ExpensesForm open={modalState.expenses} handleClose={() => handleCloseModal('expenses')} />
      <SavingsForm open={modalState.savings} handleClose={() => handleCloseModal('savings')} />
      <CategoryForm open={modalState.category} handleClose={() => handleCloseModal('category')} />

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