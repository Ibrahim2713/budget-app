import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./comps/auth/Login";
import Signup from "./comps/auth/Signup";
import Dashboard from "./comps/pages/Dashboard";
import ExpenseForm from "./common/Forms/ExpenseForm";
import IncomeForm from "./common/Forms/IncomeForm"
import SavingsForm from "./common/Forms/SavingsForm"
import IncomeAnalytics from "./comps/pages/Analytics";
import Darkdashboard from "./comps/pages/Darkdashboard";


// TODO
// USer wants to send transaction data to backend db and view this data whenever

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/dashboard' element={<Darkdashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Dashboard />}/>
        <Route path='/expenses' element={<ExpenseForm />} />
        <Route path='/income' element={<IncomeForm />} />
        <Route path='/savings' element={<SavingsForm />} />
        <Route path='/analytics' element={<IncomeAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;
