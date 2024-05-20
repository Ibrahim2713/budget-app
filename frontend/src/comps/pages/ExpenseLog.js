import  React, {useState} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Grid, TextField, Button, Select, Input, MenuItem, FormControl, InputLabel} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// User wnats to view all transactions, have the abiltiy to filter and look for specific transactions
// User wants to add and store 
const columns = [
    {field: 'date', headerName: 'DATE', width: 90},
    {field: 'Description', headerName: 'Description', width: 150, editable: true},
    {field: 'Category', headerName: 'Category', width: 110, editable: true},
    {field: 'Amount', headerName: 'Amount', width: 110, editable: true},
    {field: 'Subscription', headerName: 'Subscription', width: 110, editable: true},

]


const rows = [
    { date: 1, description: 'Snow', category: 'Jon', amount: 14, subscription: 20 },
    { date: 1, description: 'Snow', category: 'Jon', amount: 14, subscription: 20 },
    { date: 1, description: 'Snow', category: 'Jon', amount: 14, subscription: 20 },
    { date: 1, description: 'Snow', category: 'Jon', amount: 14, subscription: 20 },
    { date: 1, description: 'Snow', category: 'Jon', amount: 14, subscription: 20 },
    { date: 1, description: 'Snow', category: 'Jon', amount: 14, subscription: 20 },
    { date: 1, description: 'Snow', category: 'Jon', amount: 14, subscription: 20 },
    { date: 1, description: 'Snow', category: 'Jon', amount: 14, subscription: 20 },
    { date: 1, description: 'Snow', category: 'Jon', amount: 14, subscription: 20 }

]

function getRowId(row){
  return row.date
}


// Develop a form that user can enter new transactions and potentially send them to data base



export default function ExpenseLog() {
  const [inputValues, setInputValues] = useState({
    date: null,
    description: null,
    category: null,
    amount: null
  })
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (name, value) => {
    setInputValues((prevData) => ({
      ...prevData,
      [name]: value
    }));
    console.log(inputValues.date)
  };

  const saveToBackend = () => {
    const data = {}
    axios.post('http://localhost:8000/api/transactions', data )
      .then(() => {

      })
      .catch(() => {

      })
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
              value={inputValues.date}
              onChange={handleChange}
              label="Select a category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="category1">Food</MenuItem>
              <MenuItem value="category2">Housing</MenuItem>
              <MenuItem value="category3">Transportation</MenuItem>
              <MenuItem value="category4"> Utilities </MenuItem>
              <MenuItem value="category5"> Phone Bill </MenuItem>
              <MenuItem value="category6"> Emergency Fund </MenuItem>
              <MenuItem value="category7"> Miscellaneous </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField placeholder='Enter an Amount $' />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' onClick={saveToBackend}>Add New Transaction</Button>
        </Grid>

        

       
    


      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
        getRowId={getRowId}
          rows={rows}
          columns={columns}
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
      </Container>
    );
  }