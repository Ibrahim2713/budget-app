import React, {useState} from "react";
import '../../styles/Dashboard.css'
import Nav from "../../common/Nav/Nav";
import IncomeSection from "../../common/Income/IncomeSection";

function Dashboard() {

    return (
        <div className="dashboard-container">
        <Nav />
            <div className="income-section">
                <IncomeSection />
            </div>
        </div>
    )
}



export default Dashboard