const db = require('../../config/index')

// Get All income entries for a specific user
const getAllIncomeByUser = async (userId) => {
    return await db('income').where({user_id: userId}).select('*')
}

// Get income by ID
const getIncomeById = async (userId) => {
    return await db('income').where({user_id: userId}).first();
}

// Create a new income entry 
const createIncome = async ( userId, income) => {
    income.user_id = userId
    const [newIncome] = db('income').insert(income).returning('*');
    return newIncome
}

//Update a income entry
const updateIncome = async ( userId, incomeId, income) => {
    const [updatedIncome] = db('income').where({user_id: userId, income_id: incomeId}).update(income).returning('*');
    return updatedIncome;
}

//Delete a income entry for specific user
const deleteIncome = async ( userId, incomeId) => {
  return await db('income').where({user_id: userId, income_id: incomeId}).del()
}

















module.exports = {
    getAllIncomeByUser,
    getIncomeById,
    createIncome,
    updateIncome,
    deleteIncome
}






