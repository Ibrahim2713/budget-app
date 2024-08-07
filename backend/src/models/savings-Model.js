const db = require('../../database/db-config')

// Get All savings entries for a specific user
const getAllSavingsByUser = async (userId) => {
    return await db('savings')
        .join('date_details', 'savings.date_detail_id', 'date_details.id')
        .join('savings_categories', 'savings.category_id', 'savings_categories.id') // Join with savings_categories
        .where({ 'savings.user_id': userId })
        .select(
            'savings.*',
            'date_details.date as date',
            'savings_categories.name as category',
            'date_details.month as month',  // Select month directly
            'date_details.year as year'    // Select year directly
        );
}



// Get savings by ID
const getSavingsById = async ({date, month,year,amount, description, user_id}) => {
    await db('savings').where({user_id: userId}).first();
}

// Create a new savings entry 
const createSavings = async ({date,month,year,amount, description, user_id, category_id}) => {
    return db.transaction(async (trx) => {
    const [dateDetailId] = await trx('date_details').insert({
        date, month, year,
        user_id
    })
    .returning('id');
    const [newSavingsEntry] = await trx('savings').insert({
        amount,
        description,
        user_id,
        date_detail_id: dateDetailId.id,
        category_id
}) .returning('*');

return newSavingsEntry
})
}

//Update a savings entry
const updateSavings = async ({id, date, month, year, amount, description, user_id, category_id}) => {
    return db.transaction(async (trx) => {
        await trx('date_details').where({id}).update({
            date,
            month,
            year,
            user_id
        })
        await trx('savings').where({ id }).update({
            amount,
            description,
            user_id,
            category_id
        })
    })

}

//Delete a savings entry for specific user
const deleteSavings = async (id) => {
    return db.transaction(async (trx) => {
        await trx('savings').where({id}).del()
        await trx('date_details').where({id}).del()
      })
}

module.exports = {
    createSavings,
    getSavingsById,
    getAllSavingsByUser,
    deleteSavings,
    updateSavings
}