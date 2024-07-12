const db = require('../../database/db-config')

// Get All expenses entries for a specific user
const getAllExpensesByUser = async (userId) => {
    return await db('expenses').where({user_id: userId}).select('*')
}

// Get expenses by ID
const getExpensesById = async (userId) => {
    return await db('expenses').where({user_id: userId}).first();
}

// Create a new expenses entry 
const addExpense = async ({ amount, description, date, month, year, user_id, category_id }) => {

    return db.transaction(async (trx) => {
         const [dateDetailId] = await trx('date_details').insert({
            date,
            month,
            year,
            user_id 
        }).returning('id');
        await trx('expenses').insert({
            amount,
            description,
            user_id,
            category_id,
            date_detail_id: dateDetailId.id
        });
    })
}

//Update a expense entry
const updateExpense = async ({id, amount, description, date, month, year, user_id, category_id}) => {
  return db.transaction(async (trx) => {
    await trx('date_details').where({ id }).update({
        date,
        month,
        year,
        user_id
    })
    await trx('expenses').where({ id }).update({
        amount,
        description,
        category_id,
        user_id
    })
  })
}

//Delete a expense entry for specific user
const deleteExpense = async (id) => {
    return db.transaction(async (trx) => {
        await trx('expenses').where({id}).del()
        await trx('date_details').where({id}).del()
      })
}



module.exports = {
    getAllExpensesByUser,
    getExpensesById,
    addExpense,
    updateExpense,
    deleteExpense
}