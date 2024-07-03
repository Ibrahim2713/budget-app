/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
      // Deletes ALL existing entries
      await knex('date_details').del();

      // Inserts seed entries
      await knex('date_details').insert([
    { user_id: 1, date: '2024-01-01', month: 1, year: 2024 },
    { user_id: 2, date: '2024-02-01', month: 2, year: 2024 },
    { user_id: 3, date: '2024-03-01', month: 3, year: 2024 },
    { user_id: 4, date: '2024-04-01', month: 4, year: 2024 },
    { user_id: 5, date: '2024-05-01', month: 5, year: 2024 },
    { user_id: 6, date: '2024-06-01', month: 6, year: 2024 },
    { user_id: 7, date: '2024-07-01', month: 7, year: 2024 },
    { user_id: 8, date: '2024-08-01', month: 8, year: 2024 },
    { user_id: 9, date: '2024-09-01', month: 9, year: 2024 },
    { user_id: 10, date: '2024-10-01', month: 10, year: 2024 }
      ]);
};
