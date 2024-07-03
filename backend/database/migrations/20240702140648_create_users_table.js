/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(tbl) {
        tbl.increments('id').primary();
        tbl.string('email').notNullable().unique();
        tbl.string('first_name').notNullable();
        tbl.string('last_name').notNullable();
        tbl.string('password').notNullable();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
