import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import '../../styles/Dashboard.css'
import Nav from "../../common/Nav/Nav";
import IncomeSection from "../../common/Income/IncomeSection";
import ExpensesSection from "../../common/Expenses/ExpensesSection";
import SavingsSection from "../../common/Savings/SavingsSection";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Modal } from "@mui/material";
import IncomeForm from "../../common/Forms/IncomeForm";
import ExpensesForm from "../../common/Forms/ExpenseForm";
import SavingsForm from "../../common/Forms/SavingsForm";
import CategoryForm from "../../common/Forms/CategoryForm";


function Dashboard({ transactions}) {
    const navigate = useNavigate()
    const [modalState, setModalState] = useState({
        income: false,
        expenses: false,
        savings: false,
        category: false
      });
    
      const handleOpenModal = (modal) => setModalState({ ...modalState, [modal]: true });
      const handleCloseModal = (modal) => setModalState({ ...modalState, [modal]: false });
  





    const handleRedirect = () => {
      navigate('/analytics')
    }


    return (
        <div className="dashboard-container">
        <Nav />
            <div className="income-section">
                <h3> Income </h3>
                <Button variant="outlined" onClick={ () =>handleOpenModal('income')}>  Log Income </Button>
                <Button variant="outlined" onClick={() => handleRedirect()}> View Analytics</Button>
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
   
  })

  const mapDispatchToProps =  {
 
  }


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)