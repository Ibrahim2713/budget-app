/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').insert([
    {email: 'guest1@yahoo.com', first_name: 'mark', last_name: 'twain', password: 'guest1'},
    {email: 'guest2@yahoo.com', first_name: 'jasmine', last_name: 'goldberg', password: 'guest2'},
    {email: 'guest3@yahoo.com', first_name: 'maria', last_name: 'sanchez', password: 'guest3'},
    {email: 'guest4@yahoo.com', first_name: 'lydia', last_name: 'lee', password: 'guest4'},
    {email: 'guest5@yahoo.com', first_name: 'morgan', last_name: 'rake', password: 'guest5'},
    {email: 'guest6@yahoo.com', first_name: 'tony', last_name: 'pomp', password: 'guest6'},
  ]);
};
