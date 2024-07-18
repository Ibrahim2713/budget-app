import React from "react";
import "./Savings.css";
import SavingsOverview from "./SavingsOverview";
import SavingsPieChart from "../Analytics/SavingsPieChart";
function SavingsSection() {
  return (
    <div className="savings-container">
      <div className="savings-table-container">

      </div>
      <div className="savings-overview-container">
        <SavingsOverview />
      </div>
      <div className="savings-visual-conatiner">
        <SavingsPieChart />
      </div>
    </div>
  );
}

export default SavingsSection;
