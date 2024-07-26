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
      await trx('savings_categories').del();

      // Inserts seed entries
      await trx('savings_categories').insert([
        { id: 1, name: 'Emergency Fund', user_id: 1 },
        { id: 2, name: 'Vacation Fund', user_id: 1 },
        { id: 3, name: 'Retirement Fund', user_id: 2 },
        { id: 4, name: 'House Down Payment', user_id: 2 },
        { id: 5, name: 'Car Fund', user_id: 3 },
        { id: 6, name: 'Travel Fund', user_id: 3 },
        { id: 7, name: 'Education Fund', user_id: 4 },
        { id: 8, name: 'Investment', user_id: 4 },
        { id: 9, name: 'Rainy Day Fund', user_id: 5 }
      ]);

      // Re-enable foreign key checks
      await trx.raw('PRAGMA foreign_keys = ON');

    } catch (error) {
      // Rollback transaction in case of error
      throw error;
    }
  });
};
