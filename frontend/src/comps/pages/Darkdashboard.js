import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { setSelectedDate, setSelectedCategory } from '../../state/actionCreators'
import { Box, Typography, TextField} from '@mui/material'
import { GreenButton } from '../../styles/MuiTheme'
import { PinkButton } from '../../styles/MuiTheme'
import { RedButton } from '../../styles/MuiTheme'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Topbar from '../Topbar'
import Sidebar from '../Sidebar'
import { fetchIncome } from '../../state/actionCreators'
import { fetchSavings } from '../../state/actionCreators'
import { fetchExpenses } from '../../state/actionCreators'
import IncomeLineGraph from '../../common/Analytics/IncomeLineGraph'
import IncomePieChart from '../../common/Analytics/IncomePieChart'
import IncomeTable from '../../common/Analytics/IncomeTable'


function Darkdashboard({selectedDate, setSelectedDate}) {


const [searchTerm, setSearchTerm] = useState('');
const token = localStorage.getItem('token');


     


 
        
  
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {/* Topbar */}
      <Box>
        <Topbar />
      </Box>

      <Box display="flex"  flexDirection="column" alignItems="flex-end">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={['year', 'month']}
                label="Select Month"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} helperText={null} />}
              />
            </LocalizationProvider>
      </Box>

      <Box p="20px" display="flex" flexDirection="column" alignItems="flex-start" >
        <Typography variant="h4" fontWeight="600">
          Dashboard
        </Typography>

         {/* Buttons */}
         <Box display="flex" gap="10px" mb="20px">
          <GreenButton >Income</GreenButton>
          <PinkButton >Savings</PinkButton>
          <RedButton >Expenses</RedButton>
        </Box>
      


      </Box>

      

      
      
      {/* Sidebar and Content */}
      <Box display="flex" flex="1">
        <Box>
          <Sidebar />
        </Box>
        
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gridAutoRows="140px" gap="20px" flex="1">
          {/* Row 1 (Income) */}
          <Box gridColumn="span 1" display="flex" alignItems="center" justifyContent="center">
           
          </Box>
          <Box gridColumn="span 1" display="flex" alignItems="center" justifyContent="center">
        
          </Box>
          <Box gridColumn="span 1" display="flex" alignItems="center" justifyContent="center">
           
          </Box>
        </Box>

        {/* Row 2 */}
        <Box gridColumn="span 8" gridRow="span 2" >
            <Box mt="25px" p="0 30" display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography variant="h5" fontWeight="600">
                        Income Generated
                    </Typography>
                    <Typography variant="h3" fontWeight="500">
                        $10,546
                    </Typography>
                </Box>
                <Box>

                </Box>

            </Box>

        </Box>
      </Box>
    </Box>
  )
}
const mapStateToProps = (state) => ({
    selectedDate: state.date.selectedDate,
    selectedCategory: state.dateCategory.category,
  });

const mapDispatchToProps = {
    setSelectedDate,
    setSelectedCategory,
    fetchIncome,
    fetchSavings,
    fetchExpenses
  };

export default connect(mapStateToProps, mapDispatchToProps) (Darkdashboard)
