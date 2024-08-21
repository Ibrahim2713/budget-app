import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./styles/theme";
import Login from "./components/pages/Login";
import Analytics from "./components/pages/Analytics";
import Dashboard from "./components/pages/Dashboard";
import Spreadsheet from "./components/pages/Spreadsheet";
import Register from "./components/pages/Register";
import Calander from "./components/pages/Calander";
import Layout from "./components/Layout.js/Layout";
import {PrivateRoute}  from "./components/Auth/PrivateRoute";
import { DataProvider } from "./state/Datacontext";

function App() {
  return (
    <DataProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/spreadsheet" element={<Spreadsheet />} />
                <Route path="/calander" element={<Calander />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </DataProvider>
  );
}

export default App;
