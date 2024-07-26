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
      await trx('savings').del();

      // Inserts seed entries
      await trx('savings').insert([
        { id: 1, amount: 500, description: 'Emergency Fund', category_id: 1, user_id: 1, date_detail_id: 1 },
        { id: 2, amount: 300, description: 'Vacation Fund', category_id: 2, user_id: 1, date_detail_id: 2 },
        { id: 3, amount: 200, description: 'Retirement Fund', category_id: 3, user_id: 2, date_detail_id: 3 },
        { id: 4, amount: 400, description: 'House Down Payment', category_id: 4, user_id: 2, date_detail_id: 4 },
        { id: 5, amount: 600, description: 'Car Fund', category_id: 5, user_id: 3, date_detail_id: 5 },
        { id: 6, amount: 350, description: 'Travel Fund', category_id: 6, user_id: 3, date_detail_id: 6 },
        { id: 7, amount: 450, description: 'Education Fund', category_id: 7, user_id: 4, date_detail_id: 7 },
        { id: 8, amount: 500, description: 'Investment', category_id: 8, user_id: 4, date_detail_id: 8 },
        { id: 9, amount: 250, description: 'Emergency Fund', category_id: 1, user_id: 5, date_detail_id: 9 },
        { id: 10, amount: 100, description: 'Rainy Day Fund', category_id: 9, user_id: 5, date_detail_id: 10 }
    ]);
    

      // Re-enable foreign key checks
      await trx.raw('PRAGMA foreign_keys = ON');


    } catch (error) {
      // Rollback transaction in case of error
      throw error;
    }
  });
};