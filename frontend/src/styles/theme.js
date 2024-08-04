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
      main: colorTokens.income[500],
    },
    expenses: {
      main: colorTokens.expense[900], 
      dark: "#FF3800"
    },
    savings: {
      main: colorTokens.savings[300],
      dark: colorTokens.savings[500] // Ensure this exists if you're using it
    },


  },
});