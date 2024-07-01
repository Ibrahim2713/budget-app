const db = require('../../config/index')

// Get All savings entries for a specific user
const getAllSavingsByUser = async (userId) => {
    return await db('savings').where({user_id: userId}).select('*')
}

// Get savings by ID
const getSavingsById = async (userId) => {
    return await db('savings').where({user_id: userId}).first();
}

// Create a new savings entry 
const createSavings = async ( userId, savings) => {
    savings.user_id = userId
    const [newSavings]= db('savings').insert(savings).returning('*');
    return newSavings
}

//Update a savings entry
const updateSavings = async ( userId, savingsId, savings) => {
    const [updatedSavings] = db('savings').where({user_id: userId, savings_id: savingsId}).update(savings).returning('*');
    return updatedSavings;
}

//Delete a savings entry for specific user
const deleteSavings = async ( userId, savingsId) => {
  return await db('savings').where({user_id: userId, savings_id: savingsId}).del()
}

module.exports = {
    createSavings,
    getSavingsById,
    getAllSavingsByUser,
    deleteSavings,
    updateSavings
}