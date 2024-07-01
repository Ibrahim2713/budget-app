const db = require('../../config/index')

// Get All expenses entries for a specific user
const getAllExpensesByUser = async (userId) => {
    return await db('expenses').where({user_id: userId}).select('*')
}

// Get expenses by ID
const getExpensesById = async (userId) => {
    return await db('expenses').where({user_id: userId}).first();
}

// Create a new expenses entry 
const createExpense = async ( userId, expense) => {
    expense.user_id = userId
    const [newExpense] = db('expenses').insert(expense).returning('*');
    return newExpense
}

//Update a expense entry
const updateExpense = async ( userId, expenseId, expense) => {
    const [updatedExpense] = db('expenses').where({user_id: userId, expenses_id: expenseId}).update(expense).returning('*');
    return updatedExpense;
}

//Delete a expense entry for specific user
const deleteExpense = async (userId, expenseId) => {
  return await db('expenses').where({user_id: userId, expenses_id: expenseId}).del()
}



module.exports = {
    getAllExpensesByUser,
    getExpensesById,
    createExpense,
    updateExpense,
    deleteExpense
}