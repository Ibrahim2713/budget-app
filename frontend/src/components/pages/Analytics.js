import React, { useState, useContext } from "react";
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { DataContext } from "../../state/Datacontext";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import CalendarPicker from "../CalanderPicker";
import ComparativeLineChart from "../../analytics/charts/ComparativeLineChart";

function Analytics() {
  const theme = useTheme();

  const {
    income,
    expenses,
    savings,
    selectedDate,
    setSelectedDate,
    selectedCategory,
    setSelectedCategory,
    filteredIncome,
    filteredExpenses,
    filteredSavings,
  } = useContext(DataContext);

  console.log("Selected Date in Analytics:", selectedDate);

  return (
    <Box m="1.5rem 2.5" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Navbar />
      <Sidebar />

      <Box flex="1" ml="170px">
        <CalendarPicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="160px"
          gap="20px"
        >
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"
            backgroundColor={theme.palette.primary.main}
            borderRadius="0.55rem"
          >
            <ComparativeLineChart
              incomeData={income}
              expenseData={expenses}
              savingsData={savings}
            />
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 1"
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"
            backgroundColor={theme.palette.primary.main}
            borderRadius="0.55rem"
          >
            <Typography
              sx={{
                color: theme.palette.text.main,
              }}
            >
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </Typography>
          </Box>
          <Box
            gridColumn="span 2"
            gridRow="span 1"
         
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"
            backgroundColor={theme.palette.primary.main}
            borderRadius="0.55rem"
          >
            <Typography
              sx={{
                color: theme.palette.text.main,
              }}
            >
              {" "}
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?"{" "}
            </Typography>
          </Box>
          <Box gridColumn="span 4"
          gridRow="span 5"
          >
              <Typography sx={{
                color: theme.palette.text.main,
              }} > "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?</Typography>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}

export default Analytics;
