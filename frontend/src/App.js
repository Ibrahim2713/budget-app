import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {theme } from "./styles/theme"
import Login from "./comps/auth/Login";
import Signup from "./comps/auth/Signup";
import Dashboard from "./comps/pages/Dashboard";
import IncomeAnalytics from "./comps/pages/Analytics";
import Layout from "./comps/Layout";



// TODO
// USer wants to send transaction data to backend db and view this data whenever

function App() {
  return (
    <ThemeProvider theme={theme}>

    <Router>
      <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/analytics' element={<IncomeAnalytics />} />
        <Route path='/sample' element={<Layout />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
