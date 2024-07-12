exports.seed = async function(knex) {
  
    // Start a transaction
 
      // Deletes ALL existing entries in the users table within the transaction
      await knex('users').del();

      // Insert new users within the transaction
      await knex('users').insert([
        { id: 1, email: 'john.doe@example.com', first_name: 'John', last_name: 'Doe', password: 'password1' },
        { id: 2, email: 'jane.doe@example.com', first_name: 'Jane', last_name: 'Doe', password: 'password2' },
        { id: 3, email: 'alice.smith@example.com', first_name: 'Alice', last_name: 'Smith', password: 'password3' },
        { id: 4, email: 'bob.johnson@example.com', first_name: 'Bob', last_name: 'Johnson', password: 'password4' },
        { id: 5, email: 'charlie.brown@example.com', first_name: 'Charlie', last_name: 'Brown', password: 'password5' },
        { id: 6, email: 'david.williams@example.com', first_name: 'David', last_name: 'Williams', password: 'password6' },
        { id: 7, email: 'emma.jones@example.com', first_name: 'Emma', last_name: 'Jones', password: 'password7' },
        { id: 8, email: 'frank.miller@example.com', first_name: 'Frank', last_name: 'Miller', password: 'password8' },
        { id: 9, email: 'grace.davis@example.com', first_name: 'Grace', last_name: 'Davis', password: 'password9' },
        { id: 10, email: 'henry.moore@example.com', first_name: 'Henry', last_name: 'Moore', password: 'password10' }
      ]);
};