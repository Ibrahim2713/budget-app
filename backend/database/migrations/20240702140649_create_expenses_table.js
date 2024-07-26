/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('expenses', function(tbl) {
        tbl.increments('id').primary();
        tbl.decimal('amount', 14, 2).notNullable();
        tbl.string('description')
        tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        tbl.integer('category_id').unsigned().notNullable().references('id').inTable('categories').onDelete('CASCADE');;
        tbl.integer('date_detail_id').unsigned().notNullable().references('id').inTable('date_details').onDelete('CASCADE');;
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('expenses');
};
