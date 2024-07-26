/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('income_categories', tbl => {
        tbl.increments('id').primary();
        tbl.string('name').notNullable();
        tbl.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('income_categories');
};
