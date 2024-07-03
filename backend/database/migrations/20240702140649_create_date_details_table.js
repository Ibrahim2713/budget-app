/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('date_details', function(tbl) {
        tbl.increments('id').primary();
        tbl.date('date').notNullable();
        tbl.integer('month').notNullable();
        tbl.integer('year').notNullable();
        tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('date_details');
};
