/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categories', tbl => {
      tbl.increments('id').primary();
      tbl.string('name').notNullable();
      tbl.integer('parent_id').unsigned().references('id').inTable('categories').onDelete('CASCADE');
      tbl.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();
    
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropSchemaIfExists('categories')
};
