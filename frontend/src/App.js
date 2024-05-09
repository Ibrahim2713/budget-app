import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./comps/auth/Login";
import Signup from "./comps/auth/Signup";
import Dashboard from "./comps/pages/Dashboard";
import ExpenseLog from "./comps/pages/ExpenseLog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Dashboard />}/>
        <Route path='/transactions' element={<ExpenseLog />} />
      </Routes>
    </Router>
  );
}

export default App;