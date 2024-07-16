import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const GenericForm = ({ fields, handleSubmit, errors }) => {
  const [formValues, setFormValues] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formValues);
  };

  return (
    <form onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <FormControl key={index} fullWidth margin="normal">
          {field.type === 'select' ? (
            <>
              <InputLabel>{field.label}</InputLabel>
              <Select
                name={field.name}
                value={formValues[field.name] || ''}
                onChange={handleChange}
                error={Boolean(errors[field.name])}
              >
                {field.options.map((option, idx) => (
                  <MenuItem key={idx} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors[field.name] && <FormHelperText error>{errors[field.name]}</FormHelperText>}
            </>
          ) : (
            <TextField
              type={field.type || 'text'}
              name={field.name}
              label={field.label}
              value={formValues[field.name] || ''}
              onChange={handleChange}
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]}
              fullWidth
            />
          )}
        </FormControl>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default GenericForm;
