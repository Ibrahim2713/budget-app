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
      await trx('goals').del();

      // Inserts seed entries
      await trx('goals').insert([
        {
          id: 1,
          user_id: 1,
          type: 'income',
          amount: 5000.00,
          deadline: '2024-12-31',
          description: 'Increase monthly income by year-end',
        },
        {
          id: 2,
          user_id: 1,
          type: 'savings',
          amount: 3000.00,
          deadline: '2024-06-30',
          description: 'Save for summer vacation',
        },
        {
          id: 3,
          user_id: 2,
          type: 'expenses',
          amount: 2000.00,
          deadline: '2024-11-30',
          description: 'Reduce monthly dining expenses',
        },
        {
          id: 4,
          user_id: 3,
          type: 'savings',
          amount: 8000.00,
          deadline: '2025-01-15',
          description: 'Build an emergency fund',
        },
        {
          id: 5,
          user_id: 4,
          type: 'income',
          amount: 10000.00,
          deadline: '2024-07-20',
          description: 'Reach quarterly sales goal',
        }
      ]);

      // Re-enable foreign key checks
      await trx.raw('PRAGMA foreign_keys = ON');

    } catch (error) {
      // Rollback transaction in case of error
      throw error;
    }
  });
};
