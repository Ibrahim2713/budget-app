
import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, useTheme } from '@mui/material';
import { postIncome, postExpense, postSavings } from '../state/apiService';

const AddEntryForm = ({ dataType, onAdd, onCancel }) => {
  const theme = useTheme();
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const token = localStorage.getItem('token');


  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ category, amount: parseFloat(amount), date });
    setCategory('');
    setAmount('');
    setDate('');

    if(dataType === "Income"){
       postExpense()
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
      }}
    >
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <TextField
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <Button type="submit" variant="contained" color="primary">Add</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm;
