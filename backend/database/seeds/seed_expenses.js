/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex.transaction(async (trx) => {
    try {
      // Disable foreign key checks
      await trx.raw('PRAGMA foreign_keys = OFF');

      // Deletes ALL existing entries
      await trx('expenses').del();

      // Inserts seed entries
      await trx('expenses').insert([
      { id: 1, amount: 1200, description: 'Rent', user_id: 1, category_id: 1, date_detail_id: 1 },
      { id: 2, amount: 150, description: 'Utilities', user_id: 1, category_id: 4, date_detail_id: 2 },
      { id: 3, amount: 800, description: 'Groceries', user_id: 2, category_id: 3, date_detail_id: 3 },
      { id: 4, amount: 200, description: 'Insurance', user_id: 2, category_id: 5, date_detail_id: 4 },
      { id: 5, amount: 100, description: 'Transportation', user_id: 3, category_id: 2, date_detail_id: 5 },
      { id: 6, amount: 300, description: 'Healthcare', user_id: 3, category_id: 6, date_detail_id: 6 },
      { id: 7, amount: 400, description: 'Savings', user_id: 4, category_id: 7, date_detail_id: 7 },
      { id: 8, amount: 150, description: 'Entertainment', user_id: 4, category_id: 8, date_detail_id: 8 },
      { id: 9, amount: 500, description: 'Debt', user_id: 5, category_id: 9, date_detail_id: 9 },
      { id: 10, amount: 50, description: 'Miscellaneous', user_id: 5, category_id: 10, date_detail_id: 10 }
      ]);

      // Re-enable foreign key checks
      await trx.raw('PRAGMA foreign_keys = ON');

      // Commit transaction
      await trx.commit();
    } catch (error) {
      // Rollback transaction in case of error
      await trx.rollback();
      throw error;
    }
  });
};
