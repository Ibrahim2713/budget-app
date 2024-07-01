const db = require('../../config/index')


// Get all categories
const getAllCategories = async (userId) => {
    return await db('categories').where({user_id: userId}).select('*');
};

// Get a category by ID
const getCategoryById = async (userId) => {
    return await db('categories').where({user_id: userId}).first();
};

// Create a new category
const createCategory = async (userId, category) => {
    category.user_id = userId
    const [newCategory] = await db('categories').insert(category).returning('*');
    return newCategory;
};

// Update a category
const updateCategory = async (userId, category, categoryId) => {
    const [updatedCategory] = await db('categories').where({user_id: userId, category_id: categoryId }).update(category).returning('*');
    return updatedCategory;
};

// Delete a category
const deleteCategory = async (userId, categoryId) => {
    return await db('categories').where({user_id: userId, category_id: categoryId}).del();
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};