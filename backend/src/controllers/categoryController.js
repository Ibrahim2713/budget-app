const Category = require('../models/category-Model');

// Get all categories for a specific user
exports.getAllCategoriesByUser = async (req, res) => {
    try {
        const userId = req.decoded.subject; // Assuming `req.user.id` contains the authenticated user's ID
        const categories = await Category.getAllCategories(userId);
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
    const user_id = req.decoded.subject
    const {name, parent_id} = req.body
    try {
        const [newCategoryId] = await Category.addCategory({ name, user_id, parent_id });
        res.status(201).json({
            message: 'Category created successfully',
            id: newCategoryId
        });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Error adding category', error });
    }
}

// Update a category for a specific user
exports.updateCategory = async (req, res) => {
    const user_id = req.decoded.subject;
    const {name, parent_id, id} = req.body
    if (!user_id) {
        return res.status(400).json({ message: 'User ID is missing in the token.' });
    }
    try {
        await Category.updateCategory( id,{user_id, parent_id, name });
        res.status(200).json({ message: 'Category entry updated successfully' });  
      
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a category for a specific user
exports.deleteCategory = async (req, res) => {
    const {id} = req.params
    const user_id = req.decoded.subject
    try {
        if (!user_id) {
            return res.status(400).json({ message: 'User ID is missing in the token.' });
        }
        await Category.deleteCategory(id);
        res.status(200).json({ message: 'Category entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting categoru entry:', error);
        res.status(500).json({ message: 'Error deleting category entry', error });
    }
};