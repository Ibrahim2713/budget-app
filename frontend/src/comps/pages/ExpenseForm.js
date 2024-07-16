import React from 'react';
import GenericForm from '../GenericForm';
import GenericModal from '../GenericModal';

const ExpensesForm = ({ open, handleClose }) => {
  const fields = [
    { label: 'Amount', name: 'amount' },
    { label: 'Description', name: 'description' },
    { label: 'Category', name: 'category' },
    {  name: 'date', type: 'date' }
  ];

  const handleSubmit = (event) => {
    // Handle form submission logic
    handleClose();
  };

  return (
    <GenericModal open={open} handleClose={handleClose}>
      <h2>Log Expenses</h2>
      <GenericForm fields={fields} handleSubmit={handleSubmit} />
    </GenericModal>
  );
};

export default ExpensesForm;