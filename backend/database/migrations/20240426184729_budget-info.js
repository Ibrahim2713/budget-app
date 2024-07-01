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
  .createTable('date_details', tbl => {
    tbl.increments('date_details_id');
    tbl.string('date').notNullable().unique()
    tbl.integer('year').notNullable()
    tbl.integer('month').notNullable()
    tbl.integer('day').notNullable()
    tbl.integer('user_id')
    .unsigned()
    .references('users.user_id')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  })
  .createTable('income', tbl => {
    tbl.increments('income_id');
    tbl.integer('date').notNullable().unsigned().references('date_details_id')
    tbl.string('description')
    tbl.string('category').notNullable()
    tbl.float('amount').notNullable()
    tbl.integer('user_id')
    .unsigned()
    .references('users.user_id')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  })
  .createTable('savings', tbl => {
    tbl.increments('savings_id');
    tbl.integer('date').notNullable().unsigned().references('date_details_id')
    tbl.string('description')
    tbl.string('category').notNullable()
    tbl.float('amount').notNullable()
    tbl.integer('user_id')
    .unsigned()
    .references('users.user_id')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  })
  .createTable('expenses', tbl => {
    tbl.increments('expenses_id');
    tbl.integer('date').notNullable().unsigned().references('date_details_id')
    tbl.string('description')
    tbl.string('category').notNullable().unsigned().references('category_id')
    tbl.float('amount').notNullable()
    tbl.integer('user_id')
    .unsigned()
    .references('users.user_id')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  })
  .createTable('categories', tbl => {
    tbl.increments('category_id');
    tbl.string('name')
    tbl.integer('parent_id').notNullable().unsigned().references('category_id')
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
    .dropSchemaIfExists('categories')
    .dropSchemaIfExists('expenses')
    .dropSchemaIfExists('savings')
    .dropSchemaIfExists('income')
    .dropSchemaIfExists('date_details')
    .dropSchemaIfExists('users')
};
