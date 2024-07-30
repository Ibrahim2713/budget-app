import React, {useState} from 'react';
import axios from 'axios';
import GenericForm from './GenericForm';
import GenericModal from '../../comps/GenericModal';

const SavingsForm = ({ open, handleClose }) => {
  const [errors, setErrors] = useState({});
 const token = localStorage.getItem('token')




 const fields = [
  { label: 'Amount', name: 'amount' },
  { label: 'Description', name: 'description' },
  { name: 'date', type: 'date' },
  { label: 'Month', name: 'month', type: 'number' },
  { label: 'Year', name: 'year', type: 'number' }
];

  const handleSubmit =  async (formValues) => {
    const { amount, description, date, month, year } = formValues;

   
    try{
   const response = await axios.post('http://localhost:8000/api/savings', {amount, description, date, month, year}, {
      headers: {
        authorization: token
      }
    })
    console.log('Form submitted successfully:', response.data);
    handleClose();
  }
    catch(error)  {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error submitting form:', error);
      }
    }
    
  };

  return (
    <GenericModal open={open} handleClose={handleClose}>
      <h2>Log Savings</h2>
      <GenericForm fields={fields} handleSubmit={handleSubmit} errors={errors} />
    </GenericModal>
  );
};

export default SavingsForm;
