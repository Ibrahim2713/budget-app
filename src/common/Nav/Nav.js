import React from 'react'
import './Nav.css'
import Calendar from '../visualData/Calander'
import IncomeGraph from '../visualData/IncomeBar'
import ExpenseBar from '../visualData/ExpenseBar'
import SavingsBar from '../visualData/SavingsBar'
function Nav() {


    return (
        <div className='nav-container'>
            <div className='nav-calander-container'>
            <Calendar />
            </div>
            <div className='nav-income-conatiner'>
            <IncomeGraph />
            </div>
            <div className='nav-expenses-container'>
            <ExpenseBar />
            </div>
            <div className='nav-savings-container'>
            <SavingsBar />
            </div>

        </div>
    )

}






export default Nav