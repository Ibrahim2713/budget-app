/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  console.log('seeding savings...')
  try {
    await knex.transaction(async (trx) => {
      // Disable foreign key checks within the transaction
      await trx.raw('PRAGMA foreign_keys = OFF');

      // Delete all existing entries in the categories table within the transaction
      await trx('expense_categories').del();

      // Insert new categories and subcategories within the transaction
      await trx('expense_categories').insert([
        { id: 1, name: 'Housing', user_id: 1, parent_id: null },
        { id: 2, name: 'Transportation', user_id: 1, parent_id: null },
        { id: 3, name: 'Food', user_id: 2, parent_id: null },
        { id: 4, name: 'Utilities', user_id: 2, parent_id: null },
        { id: 5, name: 'Insurance', user_id: 3, parent_id: null },
        { id: 6, name: 'Healthcare', user_id: 3, parent_id: null },
        { id: 7, name: 'Savings', user_id: 4, parent_id: null },
        { id: 8, name: 'Entertainment', user_id: 4, parent_id: null },
        { id: 9, name: 'Debt', user_id: 5, parent_id: null },
        { id: 10, name: 'Miscellaneous', user_id: 5, parent_id: null },
        // Subcategories
        { id: 11, name: 'Rent', user_id: 1, parent_id: 1 },
        { id: 12, name: 'Mortgage', user_id: 1, parent_id: 1 },
        { id: 13, name: 'Electricity', user_id: 1, parent_id: 1 },
        { id: 14, name: 'Gas', user_id: 1, parent_id: 1 },
        { id: 15, name: 'Water', user_id: 1, parent_id: 1 },
        { id: 16, name: 'Maintenance', user_id: 1, parent_id: 1 }
  
      ]);

      // Enable foreign key checks before committing the transaction
      await trx.raw('PRAGMA foreign_keys = ON');
    });

    console.log('Categories seeded successfully.');
  } catch (error) {
    console.error('Error seeding categories:', error.message);
    throw error; // Rethrow the error to indicate seeding failure
  }
};
