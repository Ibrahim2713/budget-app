import React from "react";
import "./Nav.css";
import Calendar from "../Analytics/Calander";
import IncomeGraph from "../Analytics/TotalIncomeBar";
import ExpenseBar from "../Analytics/ExpenseBar";
import SavingsBar from "../Analytics/SavingsBar";
function Nav() {
  return (
    <div className="nav-container">
      <div className="nav-calander-container">
        <Calendar />
      </div>
      <div className="nav-income-conatiner">
        <IncomeGraph />
      </div>
      <div className="nav-expenses-container">
        <ExpenseBar />
      </div>
      <div className="nav-savings-container">
        <SavingsBar />
      </div>
    </div>
  );
}

export default Nav;
