/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
   await knex('transactions').insert([
   {date: '04-20-2024', description: '', category: 'food', amount: 20.56, user_id: 1 },
   {date: '04-20-2024', description: '', category: 'utilities', amount: 110.56, user_id: 1 },
   {date: '04-22-2024', description: '', category: 'healthcare', amount: 420.56, user_id: 2 },
   {date: '04-23-2024', description: '', category: 'food', amount: 30.56, user_id: 2 },
   {date: '04-25-2024', description: '', category: 'gas', amount: 200.56, user_id: 3 },
   {date: '04-26-2024', description: 'payed for rent', category: 'housing', amount: 1000.56, user_id: 3 },
   {date: '04-17-2024', description: '', category: 'gift', amount: 25.56, user_id: 4 },
   {date: '04-21-2024', description: '', category: 'housing', amount: 24.56, user_id: 4 },
   {date: '04-30-2024', description: '', category: 'housing', amount: 20.56, user_id: 5 },
   {date: '04-2-2024', description: 'added money to savings', category: 'savings', amount: 780.56, user_id: 5 },
   {date: '04-28-2024', description: 'went out to eat', category: 'food', amount: 240.56, user_id: 6 },
   {date: '04-23-2024', description: 'bought groceries', category: 'food', amount: 200.56, user_id: 6 },
  ]);
};
