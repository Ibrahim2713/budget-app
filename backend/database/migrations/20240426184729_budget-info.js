/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('user_id');
    tbl.string('email').unique().notNullable();
    tbl.string('first_name').notNullable();
    tbl.string('last_name').notNullable();
    tbl.string('password').notNullable()
  })
  .createTable('transactions', tbl => {
    tbl.increments('transaction_id');
    tbl.date('date').notNullable()
    tbl.string('description')
    tbl.string('category').notNullable()
    tbl.float('amount').notNullable()
    tbl.integer('user_id')
    .unsigned()
    .references('users.user_id')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropSchemaIfExists('transactions')
    .dropSchemaIfExists('users')
};
