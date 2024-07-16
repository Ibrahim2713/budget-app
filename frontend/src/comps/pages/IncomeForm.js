import React, {useState} from 'react'
import GenericModal from '../GenericModal';
import GenericForm from '../GenericForm';
const IncomeForm = ({ open, handleClose }) => {
  const fields = [
    { label: 'Amount', name: 'amount' },
    { label: 'Source', name: 'source' },
    {  name: 'date', type: 'date' }
  ];

  const handleSubmit = (event) => {
    // Handle form submission logic
    handleClose();
  };

  return (
    <GenericModal open={open} handleClose={handleClose}>
      <h2>Log Income</h2>
      <GenericForm fields={fields} handleSubmit={handleSubmit} />
    </GenericModal>
  );
};

export default IncomeForm;