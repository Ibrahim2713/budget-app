import { createTheme } from "@mui/material";
import { tokens } from "./Color";


const mode = "dark"

const colorTokens = tokens(mode)

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1a1625", // Set the primary color to #666666
    },
    secondary: {
      main: "#FFFFFF", // You can adjust the secondary color as needed
    },
    income: {
      main: colorTokens.income[500], // Ensure this exists if you're using it
    },
    expenses: {
      main: colorTokens.expense[500], // Ensure this exists if you're using it
    },
    savings: {
      main: colorTokens.savings[500], // Ensure this exists if you're using it
    },
  },
});