const db = require('../../database/db-config')


// Get all categories
const getAllCategories = async (userId) => {
    return await db('categories').where({user_id: userId}).select('*');
};

// Get a category by ID
const getCategoryById = async (userId) => {
    return await db('categories').where({user_id: userId}).first();
};

// Create a new category
const addCategory = async ({name, parent_id, user_id}) => {
   return await db('categories').insert({
    name,
    parent_id,
    user_id
   }).returning('id')
}

// Update a category
const updateCategory = async (id, {name, parent_id, user_id}) => {
    return await db('categories').where({id}).update({name, parent_id, user_id}).returning('id')
};

// Delete a category
const deleteCategory = async (id) => {
    return await db('categories').where({id}).del();
};

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
};