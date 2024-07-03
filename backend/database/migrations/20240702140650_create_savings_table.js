/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('savings', function(tbl) {
        tbl.increments('id').primary();
        tbl.decimal('amount', 14, 2).notNullable();
        tbl.string('description').notNullable();
        tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        tbl.integer('date_detail_id').unsigned().notNullable().references('id').inTable('date_details').onDelete('CASCADE');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('savings');
};
