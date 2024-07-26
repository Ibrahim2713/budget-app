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
      await trx('income_categories').del();

      // Inserts seed entries
      await trx('income_categories').insert([
        { id: 1, name: 'Salary', user_id: 1 },
        { id: 2, name: 'Freelance', user_id: 1 },
        { id: 3, name: 'Part-time Job', user_id: 2 },
        { id: 4, name: 'Consulting', user_id: 3 },
        { id: 5, name: 'Bonus', user_id: 4 },
        { id: 6, name: 'Investment', user_id: 5 }
      ]);

      // Re-enable foreign key checks
      await trx.raw('PRAGMA foreign_keys = ON');

    } catch (error) {
      // Rollback transaction in case of error
      throw error;
    }
  });
};
