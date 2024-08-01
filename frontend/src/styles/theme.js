import { createTheme } from "@mui/material";
import { tokens } from "./Color";


const mode = "dark"

const colorTokens = tokens(mode)

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1a1625", 
      light: "#484153"
      
    },
    secondary: {
      main: colorTokens.gold[300], 
      light: colorTokens.gold[100]
    },
    text: {
      main: "#ffffff"
    },

    income: {
      main: colorTokens.income[100],
    },
    expenses: {
      main: colorTokens.expense[100], 
    },
    savings: {
      main: colorTokens.savings[100], // Ensure this exists if you're using it
    },

  },
});