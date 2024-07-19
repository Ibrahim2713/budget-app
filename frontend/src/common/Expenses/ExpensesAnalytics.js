import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Grid, Box, Paper, CircularProgress } from '@mui/material';
import ExpensesLineGraph from '../Analytics/ExpensesLineGraph.js';
import ExpensesPieChart from '../Analytics/ExpensesPieChart.js';
import { fetchExpenses } from '../../state/actionCreators';
import { formatDataByMonth } from '../../utils/formatData';



function ExpensesAnalytics({fetchExpenses, expenses, selectedDate}) {
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(expenses)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchExpenses(token).then(() => {
        setLoading(false); // Set loading to false after data is fetched
      });
    }
  }, [fetchExpenses]);

  useEffect(() => {
    const formattedData = formatDataByMonth(expenses, selectedDate);
    setFilteredExpenses(formattedData);
  }, [expenses, selectedDate]);








  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );

  }
  return (
    <>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Box display="flex" justifyContent="center">
            <Paper>
            <ExpensesLineGraph data={filteredExpenses} />
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Box display="flex" justifyContent="center">
          <ExpensesPieChart data={filteredExpenses} />
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{marginTop: '20px'}}>
        <Grid item xs={12} sm={8} ms={6} > 
          <Box display="flex" justifyContent="center">
          
          </Box>
        </Grid>
      </Grid>
   </>
  )
}


const mapStateToProps = (state) => ({
  expenses: state.expense.expenses,
  selectedDate: state.date.selectedDate
});

const mapDispatchToProps = {
  fetchExpenses,
};



export default connect(mapStateToProps, mapDispatchToProps)(ExpensesAnalytics)