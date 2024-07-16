import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./comps/auth/Login";
import Signup from "./comps/auth/Signup";
import Dashboard from "./comps/pages/Dashboard";
import ExpenseForm from "./comps/pages/ExpenseForm";
import IncomeForm from "./comps/pages/IncomeForm";
import SavingsForm from "./comps/pages/SavingsForm";


// TODO
// USer wants to send transaction data to backend db and view this data whenever

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Dashboard />}/>
        <Route path='/expenses' element={<ExpenseForm />} />
        <Route path='/income' element={<IncomeForm />} />
        <Route path='/savings' element={<SavingsForm />} />
      </Routes>
    </Router>
  );
}

export default App;
