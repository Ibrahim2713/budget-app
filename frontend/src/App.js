import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Global, css } from "@emotion/react";
import { theme } from "./styles/theme";
import Login from "./components/pages/Login";
import Analytics from "./components/pages/Analytics";
import Dashboard from "./components/pages/Dashboard";
import Spreadsheet from "./components/pages/Spreadsheet";
import Register from "./components/pages/Register";
import Calander from "./components/pages/Calander";
import { PrivateRoute } from "./components/Auth/PrivateRoute";

// TODO
// USer wants to send transaction data to backend db and view this data whenever

function App() {
  return (
    <>
    <Global
    styles={css`
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
      }
    `}
  />
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        <Route  exact path="/dashboard" element={<PrivateRoute />}>
        <Route  exact path="/dashboard" element={<Dashboard />}/>
        </Route>
        <Route  exact path="/analytics" element={<PrivateRoute />}>
        <Route  exact path="/analytics" element={<Analytics />}/>
        </Route>
        <Route path="/spreadsheet" element={<PrivateRoute />} >
        <Route path="/spreadsheet" element={<Spreadsheet />}/>
        </Route>
        <Route path="/calander" element={<PrivateRoute />} >
        <Route path="/calander" element={<Calander />}/>
        </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
        </Routes>
      </Router>
    </ThemeProvider>
    </>
  );
}

export default App;
