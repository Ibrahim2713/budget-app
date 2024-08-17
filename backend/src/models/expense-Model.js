const db = require('../../database/db-config')

// Get All expenses entries for a specific user
const getAllExpensesByUser = async (userId) => {
    return await db('expenses')
        .join('date_details', 'expenses.date_detail_id', 'date_details.id')
        .join('expense_categories as ec', 'expenses.category_id', 'ec.id') // Join with expense_categories for the category
        .leftJoin('expense_categories as parent', 'ec.parent_id', 'parent.id') // Join with expense_categories for the parent category
        .where({'expenses.user_id': userId})
        .select(
            'expenses.*',
            'date_details.date as date',
            'ec.name as category',
            'ec.parent_id as parent_id',
            'date_details.month as month', // Assuming month is stored separately
            'date_details.year as year',
            'parent.name as parent_name' // Select the parent name from the joined table
        );
};



// Get expenses by ID
const getExpensesById = async (userId) => {
    return await db('expenses').where({user_id: userId}).first();
}

const addExpense = async ({ amount, description, date, month, year, user_id, category_id }) => {
    return db.transaction(async (trx) => {
      // Step 1: Check if the date already exists for the user
      const existingDateDetail = await trx('date_details')
        .where({ date, user_id })
        .first();
  
      let dateDetailId;
  
      if (existingDateDetail) {
        // If the date already exists, use the existing id
        dateDetailId = existingDateDetail.id;
      } else {
        // If the date doesn't exist, insert it and get the new id
        const [newDateDetail] = await trx('date_details')
          .insert({
            date,
            month,
            year,
            user_id
          })
          .returning('id');
        dateDetailId = newDateDetail.id;
      }
  
      // Step 2: Insert the new expense entry
      const [newExpense] = await trx('expenses').insert({
        amount,
        description,
        user_id,
        category_id,
        date_detail_id: dateDetailId
      }).returning('*');
  
      return newExpense;
    });
  };
  

  const updateExpense = async ({ id, amount, description, date, month, year, user_id, category_id }) => {
    return db.transaction(async (trx) => {
      // Step 1: Check if the date details exist for the given ID
      const existingDateDetail = await trx('date_details')
        .where({ date, user_id })
        .first();
  
      if (existingDateDetail && existingDateDetail.id !== id) {
        // If the date details exist, update them
        await trx('expenses')
          .where({ id })
          .update({
            amount,
            description,
            category_id,
            user_id,
            date_detail_id: existingDateDetail.id
          });
      } else {
        await trx('date_details')
        .where({ id })
        .update({
          date,
          month,
          year,
          user_id
        });
        await trx('expenses')
        .where({ id })
        .update({
          amount,
          description,
          category_id,
          user_id
        });
      }  
    });
  };
  

//Delete a expense entry for specific user
const deleteExpense = async (id) => {
    const idsArray = Array.isArray(ids) ? ids : [ids];

    return db.transaction(async (trx) => {

        await trx('expenses').where('id', idsArray).del()

        await trx('date_details').where('id',idsArray).del()
      });
}



module.exports = {
    getAllExpensesByUser,
    getExpensesById,
    addExpense,
    updateExpense,
    deleteExpense
}