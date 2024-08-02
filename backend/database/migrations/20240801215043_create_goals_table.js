



exports.up = function(knex) {
    return knex.schema.createTable('goals', function(tbl) {
      tbl.increments('id').primary(); 
      tbl.string('type').notNullable(); 
      tbl.decimal('amount', 10, 2).notNullable(); 
      tbl.date('deadline');
      tbl.text('description'); 
      tbl.timestamp('created_at').defaultTo(knex.fn.now()); 
      tbl.timestamp('updated_at').defaultTo(knex.fn.now()); 
      tbl.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();// Timestamp for last update
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('goals');
  };
  