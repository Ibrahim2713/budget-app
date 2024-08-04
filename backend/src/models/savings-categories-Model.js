const db = require('../../database/db-config');


// Get all categories
const getAllSavingsCategories = async (userId) => {
    return await db('savings_categories').where({user_id: userId}).select('*');
};



// Create a new category
const addSavingsCategory = async ({name,  user_id}) => {
   return await db('savings_categories').insert({
    name,
    user_id
   }).returning('id')
}

// Update a category
const updateSavingsCategory = async (id, {name, user_id}) => {
    return await db('savings_categories').where({id}).update({name, user_id}).returning('id')
};

// Delete a category
const deleteSavingsCategory = async (id) => {
    return await db('savings_categories').where({id}).del();
};

module.exports = {
getAllSavingsCategories,
addSavingsCategory,
updateSavingsCategory,
deleteSavingsCategory
};



