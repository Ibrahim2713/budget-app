const Category = require('../models/category-Model');

// Get all categories for a specific user
exports.getAllCategoriesByUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming `req.user.id` contains the authenticated user's ID
        const categories = await Category.getAllCategoriesByUser(userId);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a category by ID for a specific user
exports.getCategoryById = async (req, res) => {
    try {
        const userId = req.user.id;
        const category = await Category.getCategoryById(userId, req.params.id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new category for a specific user
exports.createCategory = async (req, res) => {
    try {
        const userId = req.user.id;
        const newCategory = await Category.createCategory(userId, req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a category for a specific user
exports.updateCategory = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedCategory = await Category.updateCategory(userId, req.params.id, req.body);
        if (updatedCategory !== null) {
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a category for a specific user
exports.deleteCategory = async (req, res) => {
    try {
        const userId = req.user.id;
        const deleted = await Category.deleteCategory(userId, req.params.id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};