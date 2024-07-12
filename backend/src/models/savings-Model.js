const db = require('../../database/db-config')

// Get All savings entries for a specific user
const getAllSavingsByUser = async (userId) => {
     return await db('savings').where({user_id: userId}).select('*')
}

// Get savings by ID
const getSavingsById = async ({date, month,year,amount, description, user_id}) => {
    await db('savings').where({user_id: userId}).first();
}

// Create a new savings entry 
const createSavings = async ({date,month,year,amount, description, user_id}) => {
    return db.transaction(async (trx) => {
    const [dateDetailId] = await trx('date_details').insert({
        date, month, year,
        user_id
    })
    .returning('id');
    await trx('savings').insert({
        amount,
        description,
        user_id,
        date_detail_id: dateDetailId.id
});
})
}

//Update a savings entry
const updateSavings = async ({id, date, month, year, amount, description, user_id}) => {
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
            user_id
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