import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../state/Datacontext";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";


const AddEntryForm = ({ dataType, onAdd, onCancel, entryToEdit, onSave }) => {
  const theme = useTheme();
  const [entry, setEntry] = useState({
    category_id: "",
    amount: "",
    date: "",
    description: "",
  })

  
  useEffect(() => {
    if (entryToEdit) {
      setEntry(entryToEdit);
    } else {
      setEntry({
        id: "",
        category: "",
        amount: "",
        date: "",
        description: "",
      });
    }
  }, [entryToEdit]);


  const { incomeCategory, expensesCategory, savingsCategory, addEntry } =
    useContext(DataContext);




    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const dateObj = new Date(entry.date);
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
    
      const newEntry = {
        category_id: entry.category_id,
        amount: parseFloat(entry.amount),
        date: entry.date,
        month,
        year,
        description: entry.description,
      };
    
      try {
        if (entryToEdit) {
          // If editing, call onSave with the updated entry
          onSave({
            ...entryToEdit, // Keep other properties of the entry being edited
            ...newEntry, // Update with the new values
          });
        } else {
          // If adding, call addEntry
          await addEntry(dataType, newEntry);
          setEntry({
            category_id: "",
            amount: "",
            date: "",
            description: "",
          });
        }
      } catch (error) {
        console.error('Error saving entry:', error);
      }
    };
    

 

  const getCategoryList = () => {
    switch (dataType) {
      case "Income":
        return incomeCategory;
      case "Expenses":
        return expensesCategory;
      case "Savings":
        return savingsCategory;
      default:
        return [];
    }
  };

  const renderMenuItems = (categories, indent = 0) => {
    return categories.flatMap((category) => [
      <MenuItem key={category.id} value={category.id} sx={{ pl: indent }}>
        {category.name}
      </MenuItem>,
      ...(category.children
        ? renderMenuItems(category.children, indent + 2)
        : []),
    ]);
  };

  const handleSave = () => {
    onSave(entry);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
      }}
    >
      <Select
        label="Category"
        value={entry.category_id}
        onChange={(e) => setEntry({...entry, category_id: e.target.value})}
        displayEmpty
        required
      >
        <MenuItem value="" disabled>
          Select Category
        </MenuItem>
        {renderMenuItems(getCategoryList())}
      </Select>
      <TextField
        label="Amount"
        type="number"
        value={entry.amount}
        onChange={(e) => setEntry({...entry, amount: e.target.value})}
        required
      />
      <TextField
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={entry.date}
        onChange={(e) => setEntry({...entry, date: e.target.value})}
        required
      />
      <TextField
        label="Description" // New description field
        value={entry.description}
        onChange={(e) => setEntry({...entry, description: e.target.value})}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm;
