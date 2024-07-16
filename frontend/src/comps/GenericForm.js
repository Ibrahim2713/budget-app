import React, {useState} from 'react';
import { TextField, Button } from '@mui/material';

const GenericForm = ({ fields, handleSubmit }) => {
  const [formValues, setFormValues] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );


  const handleChange = (event) => {
   
    const { name, value } = event.target;
    console.log(value)
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <form onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <TextField
          key={index}
          label={field.label}
          type={field.type || 'text'}
          fullWidth
          margin="normal"
          name={field.name}
          onChange={handleChange}
        />
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default GenericForm;
