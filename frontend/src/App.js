import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import Login from "./components/pages/Login";

import IncomeAnalytics from "./components/pages/Analytics";
import Dashboard from "./components/pages/Dashboard";
import Logs from "./components/pages/Logs";
import NewAnalytics from "./components/NewAnalytics";

// TODO
// USer wants to send transaction data to backend db and view this data whenever

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/analytics" element={<IncomeAnalytics />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/sample" element={<NewAnalytics />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
