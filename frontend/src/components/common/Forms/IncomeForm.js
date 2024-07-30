import React, {useState} from 'react'
import axios from 'axios'
import GenericModal from '../../comps/GenericModal';
import GenericForm from './GenericForm';
const IncomeForm = ({ open, handleClose }) => {
  const [errors, setErrors] = useState({});
const token = localStorage.getItem('token')



  const fields = [
    { label: 'Amount', name: 'amount' },
    { label: 'Source', name: 'source' },
    {  name: 'date', type: 'date' },
    { label: 'Month', name: 'month', type: 'number' },
    { label: 'Year', name: 'year', type: 'number' }
  ];

  const handleSubmit =  async (formValues) => {

    const  {amount, source, date, month, year} = formValues
    console.log(date,month,year)

    try {const response =  await axios.post('http://localhost:8000/api/income', {amount, source, date, month, year}, {
      headers:{
        authorization: token
      }
    })
    console.log('Form submitted successfully:', response.data);
    handleClose();

  }
    catch(error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error submitting form:', error);
      }
    }
   
  };

  return (
    <GenericModal open={open} handleClose={handleClose}>
      <h2>Log Income</h2>
      <GenericForm fields={fields} handleSubmit={handleSubmit} errors={errors} />
    </GenericModal>
  );
};

export default IncomeForm;