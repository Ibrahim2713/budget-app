/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  console.log('seeding income...')
  await knex.transaction(async (trx) => {
    try {
      // Disable foreign key checks
      await trx.raw('PRAGMA foreign_keys = OFF');

      // Deletes ALL existing entries
      await trx('income').del();

      // Inserts seed entries
      await trx('income').insert([
        { id: 1, amount: 5000, source: 'Salary', category_id: 1, user_id: 1, date_detail_id: 1 },
        { id: 2, amount: 200, source: 'Freelance', category_id: 2, user_id: 1, date_detail_id: 2 },
        { id: 3, amount: 4500, source: 'Salary', category_id: 1, user_id: 2, date_detail_id: 3 },
        { id: 4, amount: 250, source: 'Part-time Job', category_id: 3, user_id: 2, date_detail_id: 4 },
        { id: 5, amount: 6000, source: 'Salary', category_id: 1, user_id: 3, date_detail_id: 5 },
        { id: 6, amount: 300, source: 'Consulting', category_id: 4, user_id: 3, date_detail_id: 6 },
        { id: 7, amount: 7000, source: 'Salary', category_id: 1, user_id: 4, date_detail_id: 7 },
        { id: 8, amount: 100, source: 'Freelance', category_id: 2, user_id: 4, date_detail_id: 8 },
        { id: 9, amount: 8000, source: 'Salary', category_id: 1, user_id: 5, date_detail_id: 9 },
        { id: 10, amount: 150, source: 'Part-time Job', category_id: 3, user_id: 5, date_detail_id: 10 }
    ]);
    

      // Re-enable foreign key checks
      await trx.raw('PRAGMA foreign_keys = ON');

      console.log('Seeding income completed successfully')
    } catch (error) {
      console.error('Error seeding income:', error)
   
      throw error;
    }
  });
};