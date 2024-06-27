import  React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchTransactions, postTransaction } from '../../state/actionCreators';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Grid, TextField, Button, Select, Input, MenuItem, FormControl, InputLabel} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';


const columns = [
  {field: 'transaction_id', headerName: 'ID',  width: 90},
  { field: 'date', headerName: 'DATE', width: 90  ,  renderCell: (params) => params.value ? params.value.substring(0, 10) : ''},
  { field: 'description', headerName: 'Description', width: 150, editable: true },
  { field: 'category', headerName: 'Category', width: 110, editable: true },
  { field: 'amount', headerName: 'Amount', width: 110, editable: true },
  { field: 'subscription', headerName: 'Subscription', width: 110, editable: true },
];

function ExpenseLog({fetchTransactions, postTransaction, transactions}) {


    // grabs token from local storage to authentciate user request
    const token = localStorage.getItem('token')
  
    useEffect(() => {
      if (token) {
        fetchTransactions(token);
      }
    }, [token]);


  const [snackbarOpen, setSnackbarOpen] = useState()
  const [snackbarMessage, setSnackbarMessage] = useState()
  const [inputValues, setInputValues] = useState({
    date: null,
    description: null,
    category: null,
    amount: null
  })


  const handleChange = (name, value) => {
    setInputValues((prevData) => ({
      ...prevData,
      [name]: value
    }));

  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }
// adds new transaction to backend (transaction log)
  const handlePostRequest = () => {

    const {date, description,  category, amount} = inputValues
   
    
    const data = {amount,category, date, description}
    postTransaction(data, token)
    .then(() => {
      setSnackbarMessage('Transaction added successfully');
      setSnackbarOpen(true);
    })
    .catch(() => {
      setSnackbarMessage('Error adding transaction');
      setSnackbarOpen(true);
    });

  }





    return (
      <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Select a date" value={inputValues.date} onChange={ (newDate) => handleChange('date', newDate)} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField placeholder='Select a description' value={inputValues.description} onChange={ (e) => handleChange('description', e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="category-label">Select a category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={inputValues.category}
              onChange={ (e) => handleChange('category',e.target.value )}
              label="Select a category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="housing">Housing</MenuItem>
              <MenuItem value="transportation">Transportation</MenuItem>
              <MenuItem value="utilities"> Utilities </MenuItem>
              <MenuItem value="phone bill"> Phone Bill </MenuItem>
              <MenuItem value="emergency fund"> Emergency Fund </MenuItem>
              <MenuItem value="miscellaneous"> Miscellaneous </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField  value={inputValues.amount} onChange={(e) => handleChange('amount', e.target.value)} placeholder='Enter an Amount $' />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' onClick={handlePostRequest}>Add New Transaction</Button>
        </Grid>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={transactions}
          columns={columns}
          getRowId={(row)=> row.transaction_id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      </Container>
    );
  }
  const mapStateToProps = (state) => ({
    transactions : state.transactions.transactions
  })

  const mapDispatchToProps =  {
    fetchTransactions,
    postTransaction
  }

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseLog)