import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GenericForm from './GenericForm'
import GenericModal from '../../comps/GenericModal';

const ExpensesForm = ({ open, handleClose }) => {
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

console.log(categories)

const token = localStorage.getItem('token')

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/category', { headers:{
        authorization: token
      }});
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  fetchCategories();
}, []);

const fields = [
  { label: 'Amount', name: 'amount' },
  { label: 'Description', name: 'description' },
  {label: 'Category', name: 'category_id', type: 'select', options: categories.map(cat => ({ label: cat.name, value: cat.id })) },
  { name: 'date', type: 'date' },
  { label: 'Month', name: 'month', type: 'number' },
  { label: 'Year', name: 'year', type: 'number' }
];
  const handleSubmit = async  (formValues) => {
    const { amount, description, category_id, date, month, year } = formValues;
    try{
    const response = axios.post('http://localhost:8000/api/expenses', {amount, description, category_id, date, month, year}, {
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
      <h2>Log Expenses</h2>
      <GenericForm fields={fields} handleSubmit={handleSubmit} errors={errors} />
    </GenericModal>
  );
};

export default ExpensesForm;