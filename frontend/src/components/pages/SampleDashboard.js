 import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setSelectedDate,
  setSelectedCategory,
} from "../../state/actionCreators";
import { useTheme } from "@emotion/react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import {
  fetchIncome,
  fetchSavings,
  fetchExpenses,
} from "../../state/actionCreators";
import { formatDataByMonth } from "../../utils/formatData";
import Header from "../Header";
import IncomeLineGraph from "../../common/Analytics/Income/IncomeLineGraph";
import IncomePieChart from "../../common/Analytics/Income/IncomePieChart";
import IncomeTable from "../../common/Analytics/Income/IncomeTable";
import SavingsLineGraph from "../../common/Analytics/Savings/SavingsLineGraph";
import SavingsPieChart from "../../common/Analytics/Savings/SavingsPieChart";
import SavingsTable from "../../common/Analytics/Savings/SavingsTable";
import ExpensesLineGraph from "../../common/Analytics/Expenses/ExpensesLineGraph.js.js";
import ExpensesPieChart from "../../common/Analytics/Expenses/ExpensesPieChart";
import ExpenseTable from "../../common/Analytics/Expenses/ExpenseTable";
import IncomeForm from "../../common/Forms/IncomeForm";
import ExpensesForm from "../../common/Forms/ExpenseForm";
import SavingsForm from "../../common/Forms/SavingsForm";
import CategoryForm from "../../common/Forms/CategoryForm";


function SampleDashboard({
  selectedDate,
  setSelectedDate,
  fetchIncome,
  fetchSavings,
  fetchExpenses,
  income,
  savings,
  expenses,
}) {
const theme = useTheme();
  const token = localStorage.getItem("token");
  const [modalState, setModalState] = useState({
    income: false,
    expenses: false,
    savings: false,
    category: false
  });


  const handleOpenModal = (modal) => setModalState({ ...modalState, [modal]: true });
  const handleCloseModal = (modal) => setModalState({ ...modalState, [modal]: false });

    /* useEffect(() => {
    fetchIncome(token);
    fetchSavings(token);
    fetchExpenses(token);
  }, [fetchIncome, fetchSavings, fetchExpenses, token]); */


  return (
    <Box display="flex" flexDirection="column" height="100vh" sx={{ backgroundColor: theme.palette.primary.main }} >
      {/* Topbar */}
      <Box>
        <Topbar />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
          sx={{
            backgroundColor: theme.palette.secondary.main
          }}
            views={["year", "month"]}
            label="Select Month"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => (
                <TextField
              {...params}
              helperText={null}
            />
            )}
          />
        </LocalizationProvider>
      </Box>

      <Box p="20px" display="flex" flexDirection="column" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"></Header>
       
        {/* Buttons */}
        <Box display="flex" gap="10px" mb="20px">
          <Button sx={{ backgroundColor: theme.palette.income.main, color: theme.palette.secondary.main}} >Income</Button>
          <Button  sx={{ backgroundColor: theme.palette.savings.main, color: theme.palette.secondary.main}} >Savings</Button>
          <Button sx={{ backgroundColor: theme.palette.expenses.main, color: theme.palette.secondary.main}}  >Expenses</Button>
        </Box>

        <IncomeForm open={modalState.income} handleClose={() => handleCloseModal('income')} />
      <ExpensesForm open={modalState.expenses} handleClose={() => handleCloseModal('expenses')} />
      <SavingsForm open={modalState.savings} handleClose={() => handleCloseModal('savings')} />
      <CategoryForm open={modalState.category} handleClose={() => handleCloseModal('category')} />
      </Box>

      {/* Sidebar and Content */}
      <Box display="flex" flex="1">
        <Box>
          <Sidebar />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gridAutoRows="minmax(150px, auto)"
          gap="20px"
          flex="1"
          p={2}
          sx={{ backgroundColor: theme.palette.primary.main }}
        >
          {/* Row 1 (Income) */}
          <Box
            gridColumn="span 3"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
              <Box
              mt="25px"
              p="0 30"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >

            <Typography variant="h4" fontWeight="600" mb={2} sx={{ color: theme.palette.secondary.main}}>
              Income Data
            </Typography>
            <Button onClick={() => handleOpenModal('income')} sx={{ 
                backgroundColor: theme.palette.income.main,
                color: theme.palette.secondary.main
            }}>
                Add Income
            </Button>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gridAutoRows="minmax(150px, auto)"
              gap="20px"
              width="100%"
            >
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Income Line Graph
                </Typography>
                <IncomeLineGraph data={formattedIncomeData} />
              </Box>
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Income Pie Chart
                </Typography>
                <IncomePieChart data={formattedIncomeData} />
              </Box>
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Income Table
                </Typography>
                <IncomeTable data={formattedIncomeData} />
              </Box>
            </Box>
          </Box>

          {/* Row 2 (Savings) */}
          <Box
            gridColumn="span 3"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Box
              mt="25px"
              p="0 30"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography variant="h4" fontWeight="600" sx={{ color: theme.palette.secondary.main}}>
                Savings Data
              </Typography>
              <Button  onClick={() => handleOpenModal('savings')} sx={{ 
                backgroundColor: theme.palette.savings.main,
                color: theme.palette.primary.main
            }}>
                Add Savings
            </Button>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gridAutoRows="minmax(150px, auto)"
              gap="20px"
              width="100%"
              mt={2}
            >
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Savings Line Graph
                </Typography>
                <SavingsLineGraph data={formattedSavingsData} />
              </Box>
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Savings Pie Chart
                </Typography>
                <SavingsPieChart data={formattedSavingsData} />
              </Box>
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Savings Table
                </Typography>
                <SavingsTable data={formattedSavingsData} />
              </Box>
            </Box>
          </Box>

          {/* Row 3 (Expenses) */}
          <Box
            gridColumn="span 3"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Box
              mt="25px"
              p="0 30"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography variant="h4" fontWeight="600" sx={{ color: theme.palette.secondary.main}}>
                Expenses Data
              </Typography>
              <Button onClick={ () => handleOpenModal('expenses')} sx={{ 
                backgroundColor: theme.palette.expenses.main,
                color: theme.palette.secondary.main
            }}>
                Add Expenses
            </Button>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gridAutoRows="minmax(150px, auto)"
              gap="20px"
              width="100%"
              mt={2}
            >
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Expenses Line Graph
                </Typography>
                <ExpensesLineGraph data={formattedExpensesData} />
              </Box>
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Expenses Pie Chart
                </Typography>
                <ExpensesPieChart data={formattedExpensesData} />
              </Box>
              <Box
                gridColumn="span 1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.secondary.main}}>
                  Expenses Table
                </Typography>
                <ExpenseTable data={formattedExpensesData} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  ); 
}




export default SampleDashboard;
