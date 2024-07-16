import React, {useState, useEffect} from 'react'
import axios from 'axios'
import GenericModal from '../GenericModal';
import GenericForm from '../GenericForm';
const CategoryForm = ({ open, handleClose}) => {
const [categoryOptions, setCategoryOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem('token')


  useEffect(() => {
        axios.get('http://localhost:8000/api/category', {
            headers: {
                authorization: token
            }
        })
        .then((response) =>{
            const fetchedCategories = response.data.map(cat => ({
                value: cat.id, label: cat.name
              }));
              setCategoryOptions(fetchedCategories);
            })
        .catch((err) => {
            console.log(err)
        })
  }, [token])



  const fields = [
    {
      name: 'name',
      label: 'Category Name',
      type: 'text'
    },
    {
      name: 'parent_id',
      label: 'Main Category',
      type: 'select',
      options: [{ value: '', label: 'None' }, ...categoryOptions]
    }
  ];

  const handleSubmit =  async (formValues) => {

    const  {name, parent_id} = formValues

    const payload = {name};
    if(parent_id) {
        payload.parent_id = parent_id
    }
    

    try {const response =  await axios.post('http://localhost:8000/api/category' , payload, {
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
      <GenericModal open={open} handleClose={handleClose} >
        <h2>  Create Category</h2>
        <GenericForm
          fields={fields}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      </GenericModal>
  );
};

export default CategoryForm;