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
      main: "#FFFFFF", 
    },
    income: {
      main: colorTokens.income[500],
    },
    expenses: {
      main: colorTokens.expense[500], 
    },
    savings: {
      main: colorTokens.savings[500], // Ensure this exists if you're using it
    },
  },
});