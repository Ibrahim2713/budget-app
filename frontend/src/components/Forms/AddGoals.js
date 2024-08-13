import React, { useState, useContext } from 'react';
import { DataContext } from '../../state/Datacontext';


function AddGoalForm() {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [goalType, setGoalType] = useState('');
  const [goalAmount, setGoalAmount] = useState('')
  const { addGoals } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const newGoal = {amount: goalAmount,  description: description, deadline:deadline, type:goalType };
    await addGoals(newGoal);


    setGoalAmount('');
    setDescription('');
    setDeadline('');
    setGoalType('')
    } catch(error){
        console.error('Error adding goal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
     <input
        type="number"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
        placeholder="Goal Amount"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Goal Description"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
    <select 
          value={goalType} 
          onChange={(e) => setGoalType(e.target.value)} 
          required
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="savings">Savings</option>
          <option value="expenses">Expenses</option>
        </select>
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default AddGoalForm;
