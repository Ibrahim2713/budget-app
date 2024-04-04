import React from 'react'
import './Nav.css'
import Calendar from '../Calander'
import IncomeGraph from '../visualData/IncomeGraph'
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

            </div>
            <div className='nav-savings-container'>

            </div>

        </div>
    )

}






export default Nav