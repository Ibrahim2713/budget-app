import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchSavings } from '../../state/actionCreators';
import { Grid, Box, Paper, CircularProgress } from '@mui/material';
import SavingsLineGraph from '../Analytics/SavingsLineGraph';
import SavingsBarGraph from '../Analytics/SavingsBarGraph';
import SavingsTable from '../Analytics/SavingsTable';
import { formatDataByMonth } from '../../utils/formatData';


function SavingsAnalytics({savings, fetchSavings, selectedDate}) {
  const [filteredSavings, setFilteredSavings] = useState([]);
  const [loading, setLoading] = useState(true);
 




  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchSavings(token).then(() => {
        setLoading(false); // Set loading to false after data is fetched
      });
    }
  }, [fetchSavings]);

  useEffect(() => {
    const formattedData = formatDataByMonth(savings, selectedDate);
    setFilteredSavings(formattedData);
  }, [savings, selectedDate]);


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
      <Box display="flex" justifyContent="center">
        <Paper>
        <SavingsLineGraph data={filteredSavings} />
        </Paper>
      </Box>
    </Grid>
  </Grid>
  <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
    <Grid item xs={12} sm={8} md={6}>
      <Box display="flex" justifyContent="center">
        <SavingsBarGraph data={filteredSavings} />
      </Box>
    </Grid>
  </Grid>
  <Grid container justifyContent="center" style={{marginTop: '20px'}}>
    <Grid item xs={12} sm={8} ms={6} > 
      <Box display="flex" justifyContent="center">
        <SavingsTable data={filteredSavings} />
      </Box>
    </Grid>
  </Grid>
</>
  )
}


const mapStateToProps = (state) => ({
savings: state.savings.savings,
selectedDate: state.date.selectedDate
});

const mapDispatchToProps = {
  fetchSavings
};

export default connect(mapStateToProps, mapDispatchToProps)(SavingsAnalytics)