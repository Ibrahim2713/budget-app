const db = require('../../config/index')

// Get all date details
const getAllDateDetails = async (userId) => {
    return await db('date_details').where({user_id: userId}).select('*');
};

// Get date details by ID
const getDateDetailsById = async (userId) => {
    return await db('date_details').where({ user_id: userId }).first();
};



// Create new date details
const createDateDetails = async (dateDetails, userId) => {
    dateDetails.user_id = userId
    const [newDateDetails] = await db('date_details').insert(dateDetails).returning('*');
    return newDateDetails;
};

// Get date details by specific date for  user
const getDateDetailsByDate = async ({date, userId}) => {
    return await db('date_details').where({ date, user_id: userId }).select('*');
};

// Get date details by specific month and year
const getDateDetailsByMonthYear = async (month, year, userId) => {
    return await db('date_details').where({ month, year, user_id: userId }).select('*');
};



// Update date details
const updateDateDetails = async (userId, dateDetails, dateDetailsId) => {
    const [updatedDateDetails] = await db('date_details').where({user_id: userId, date_details: dateDetailsId }).update(dateDetails).returning('*');
    return updatedDateDetails;
};

// Delete date details
const deleteDateDetails = async (userId, dateDetailsId) => {
    return await db('date_details').where({user_id: userId, date_details: dateDetailsId }).del();
};

module.exports = {
    getAllDateDetails,
    getDateDetailsById,
    getDateDetailsByDate,
    getDateDetailsByMonthYear,
    createDateDetails,
    updateDateDetails,
    deleteDateDetails,
};