const db = require('../../database/db-config')


// Get all categories
const getExpenseCategories = async (userId) => {
      // Fetch all categories for the user
    const categories = await db('expense_categories')
    .where({ user_id: userId })
    .select('*');

  // Organize categories into a hierarchy
  const categoryMap = {};
  const rootCategories = [];

  // Create a map of category ID to category object
  categories.forEach((category) => {
    category.children = []; // Initialize children array
    categoryMap[category.id] = category;

    // If the category has a parent, add it to the parent's children array
    if (category.parent_id) {
      if (categoryMap[category.parent_id]) {
        categoryMap[category.parent_id].children.push(category);
      }
    } else {
      // If no parent_id, it is a root category
      rootCategories.push(category);
    }
  });

  return rootCategories;
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