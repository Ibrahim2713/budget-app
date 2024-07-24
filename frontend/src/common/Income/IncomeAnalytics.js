import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Grid, Box, Paper, CircularProgress } from '@mui/material'
import IncomeLineGraph from '../Analytics/IncomeLineGraph';
import IncomePieChart from '../Analytics/IncomePieChart';
import IncomeTable from '../Analytics/IncomeTable';
import { fetchIncome } from '../../state/actionCreators';
import { formatDataByMonth } from '../../utils/formatData';

function IncomeAnalytics({fetchIncome, income, selectedDate}) {
    const [filteredIncome, setFilteredIncome] = useState([]);
    const [loading, setLoading] = useState(true);
   
 

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        fetchIncome(token).then(() => {
          setLoading(false); // Set loading to false after data is fetched
        });
      }
    }, [fetchIncome]);

    useEffect(() => {
      const formattedData = formatDataByMonth(income, selectedDate);
      setFilteredIncome(formattedData);
    }, [income, selectedDate]);



    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }
  








  return (
   <>
      <Grid container direction="column" alignItems="center" spacing={3} style={{ marginTop: '30px' }}>
        <Grid item xs={12} sm={8} md={6}>
          
          <Paper elevation={3} style={{ padding: '20px' }}>
            <IncomeLineGraph data={filteredIncome} />
            </Paper>
         
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
            <IncomePieChart data={filteredIncome} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{marginTop: '20px'}}>
        <Grid item xs={12} sm={8} ms={6} > 
        <Paper elevation={3} style={{ padding: '20px' }}>
            <IncomeTable data={filteredIncome} />
          </Paper>
        </Grid>
      </Grid>
   </>
  )
}


const mapStateToProps = (state) => ({
    income: state.income.income,
    selectedDate: state.date.selectedDate
  });
  
  const mapDispatchToProps = {
    fetchIncome,
  };

export default connect(mapStateToProps, mapDispatchToProps)(IncomeAnalytics)