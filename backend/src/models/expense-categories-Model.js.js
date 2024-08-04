const db = require('../../database/db-config')


// Get all categories
const getExpenseCategories = async (userId) => {
    return await db('expense_categories').where({user_id: userId}).select('*');
};



// Create a new category
const addExpenseCategory = async ({name, parent_id, user_id}) => {
   return await db('expense_categories').insert({
    name,
    parent_id,
    user_id
   }).returning('id')
}

// Update a category
const updateExpenseCategory = async (id, {name, parent_id, user_id}) => {
    return await db('expense_categories').where({id}).update({name, parent_id, user_id}).returning('id')
};

// Delete a category
const deleteExpenseCategory = async (id) => {
    return await db('expense_categories').where({id}).del();
};

module.exports = {
  getExpenseCategories,
  addExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory
};