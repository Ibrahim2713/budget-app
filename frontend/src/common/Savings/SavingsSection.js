import React from "react";
import "./Savings.css";
import SavingsTable from "../Analytics/SavingsTable";
import SavingsOverview from "./SavingsOverview";
import SavingsPieChart from "../Analytics/SavingsPieChart";
function SavingsSection() {
  return (
    <div className="savings-container">
      <div className="savings-table-container">
        <SavingsTable />
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
