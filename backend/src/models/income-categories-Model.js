const db = require('../../database/db-config');

// Get all categories
const getAllIncomeCategories = async (userId) => {
    return await db('income_categories').where({user_id: userId}).select('*');
};



// Create a new category
const addIncomeCategory = async ({name,  user_id}) => {
   return await db('income_categories').insert({
    name,
    user_id
   }).returning('id')
}

// Update a category
const updateIncomeCategory = async (id, {name, user_id}) => {
    return await db('income_categories').where({id}).update({name, user_id}).returning('id')
};

// Delete a category
const deleteIncomeCategory = async (id) => {
    return await db('income_categories').where({id}).del();
};

module.exports = {
 getAllIncomeCategories,
 addIncomeCategory,
 updateIncomeCategory,
 deleteIncomeCategory
};



