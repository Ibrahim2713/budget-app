import react from 'react'
import './Income.css'
import IncomeTable from '../visualData/IncomeTable'
import IncomeOverview from './IncomeOverview'
import SpendingPieChart from '../visualData/SpendingPieChart'
import ActiveIncomeBar from '../visualData/ActiveIncomeBar'

function IncomeSection() {
    return (
        <div className='container'>
            <div className='income-table-container'>
            <IncomeTable />
            </div>
            <div className='income-overview-container'>
                <IncomeOverview />
                <SpendingPieChart />
            </div>
            <div className='active-income-container'>
                <ActiveIncomeBar />
            </div>

        </div>
    )
}







export default IncomeSection