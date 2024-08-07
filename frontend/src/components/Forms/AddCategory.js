import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../state/Datacontext';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@mui/material';

const AddCategoryForm = ({ open, onClose, dataType }) => {
    const { addCategory, expensesCategory } = useContext(DataContext);
    const theme = useTheme();
    const [categoryName, setCategoryName] = useState('');
    const [parentCategory, setParentCategory] = useState(''); // For hierarchical categories
    const [parentCategories, setParentCategories] = useState([]); // Available parent categories

    useEffect(() => {
        if (dataType === 'Expenses') {
            // Filter out categories that have children and do not have parents
            const parents = expensesCategory.filter(cat => !cat.parent_id);
            setParentCategories(parents);
        } else {
            setParentCategories([]);
        }
    }, [dataType, expensesCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                name: categoryName,
                parent_id: parentCategory || null, // Set parent_id to null if not a child
            };
            await addCategory(dataType, data);
            // Reset state after submission
            setCategoryName('');
            setParentCategory('');
            onClose();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap="1rem" sx={{ minWidth: '300px' }}>
                    <TextField
                        label="Category Name"
                        variant="outlined"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        fullWidth
                    />
                    {dataType === 'Expenses' && (
                        <TextField
                            label="Parent Category"
                            variant="outlined"
                            value={parentCategory}
                            onChange={(e) => setParentCategory(e.target.value)}
                            fullWidth
                            select
                            SelectProps={{ native: true }}
                        >
                            <option value="">None</option>
                            {parentCategories.map((parent) => (
                                <option key={parent.id} value={parent.id}>
                                    {parent.name}
                                </option>
                            ))}
                        </TextField>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add Category
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCategoryForm;
