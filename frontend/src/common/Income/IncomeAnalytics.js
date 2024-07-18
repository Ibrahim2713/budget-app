import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Grid, Box, Paper } from '@mui/material'
import IncomeLineGraph from '../Analytics/IncomeLineGraph';
import IncomePieChart from '../Analytics/IncomePieChart';
import IncomeTable from '../Analytics/IncomeTable';
import { fetchIncome } from '../../state/actionCreators';
import { formatDataByMonth } from '../../utils/formatData';

function IncomeAnalytics({fetchIncome, income}) {
    const token = localStorage.getItem('token');
    const [filteredIncome, setFilteredIncome] = useState([]);


    useEffect(() => {
        if (token) {
          fetchIncome(token);
        }
      }, [token, fetchIncome]);



  return (
   <>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Box display="flex" justifyContent="center">
            <Paper>
            <IncomeLineGraph data={filteredIncome} />
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Box display="flex" justifyContent="center">
            <IncomePieChart data={filteredIncome} />
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{marginTop: '20px'}}>
        <Grid item xs={12} sm={8} ms={6} > 
          <Box display="flex" justifyContent="center">
            <IncomeTable data={filteredIncome} />
          </Box>
        </Grid>
      </Grid>
   </>
  )
}


const mapStateToProps = (state) => ({
    income: state.income.income,
  });
  
  const mapDispatchToProps = {
    fetchIncome,
  };

export default connect(mapStateToProps, mapDispatchToProps)(IncomeAnalytics)