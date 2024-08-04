import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import Login from "./components/pages/Login";
import Analytics from "./components/pages/Analytics";
import Dashboard from "./components/pages/Dashboard";
import Spreadsheet from "./components/pages/Spreadsheet";

// TODO
// USer wants to send transaction data to backend db and view this data whenever

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/spreadsheet" element={<Spreadsheet />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
