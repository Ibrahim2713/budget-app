import React, { useState, useContext } from 'react';
import { DataContext } from '../../state/Datacontext';
import { Button, TextField, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function AddGoalForm({ onFormSubmit, onCancel }) {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [goalType, setGoalType] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const { addGoals } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newGoal = { amount: goalAmount, description, deadline, type: goalType };
      await addGoals(newGoal);

      // Reset the form fields
      setGoalAmount('');
      setDescription('');
      setDeadline('');
      setGoalType('');
      onFormSubmit();
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <TextField
        label="Goal Amount"
        type="number"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Goal Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Deadline"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Goal Type</InputLabel>
        <Select
          value={goalType}
          onChange={(e) => setGoalType(e.target.value)}
          label="Goal Type"
          required
        >
          <MenuItem value="">Select Type</MenuItem>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="savings">Savings</MenuItem>
          <MenuItem value="expenses">Expenses</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Add Goal
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default AddGoalForm;
