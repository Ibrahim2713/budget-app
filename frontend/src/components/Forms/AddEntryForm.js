import React, { useState, useContext } from "react";
import { DataContext } from "../../state/Datacontext";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";


const AddEntryForm = ({ dataType, onAdd, onCancel }) => {
  const theme = useTheme();
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState(""); // New state for description
  const { incomeCategory, expensesCategory, savingsCategory, addEntry } =
    useContext(DataContext);




  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const newEntry = { category_id: categoryId, amount: parseFloat(amount), date, month, year, description };

    try {
      await addEntry(dataType, newEntry);
      setCategoryId('');
      setAmount('');
      setDate('');
      setDescription('');
    } catch (error) {
      console.error('Error adding entry:', error);
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
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
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
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <TextField
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <TextField
        label="Description" // New description field
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
