const db = require('../../database/db-config')

// Get All income entries for a specific user
const getAllIncomeByUser = async (userId) => {
    return await db('income')
        .join('date_details', 'income.date_detail_id', 'date_details.id')
        .join('income_categories', 'income.category_id', 'income_categories.id')
        .where({ 'income.user_id': userId })
        .select(
            'income.*',
            'date_details.date as date',
            'income_categories.id as category_id',
            'income_categories.name as category',
            'date_details.month as month',  // Select month directly
            'date_details.year as year'    // Select year directly
        );
}




// Get income by ID
const getIncomeById = async (userId) => {
    return await db('income').where({user_id: userId}).first();
}

// Create a new income entry 
const addIncomeWithDate = async ({date, month, year, amount, category_id, user_id, description}) => {

    return db.transaction(async (trx) => {
         // Step 1: Insert the date into the date_details table
        const [dateDetailId] = await trx('date_details').insert({
            date, month, year,
            user_id
        })
        .returning('id');
        // Step 2: Insert the income entry using the dateDetailId
       const [newIncome] = await trx('income').insert({
            amount,
            category_id,
            user_id,
            date_detail_id: dateDetailId.id,
            description
    })
    .returning('*');

    return newIncome;
});
}


//Update a income entry
const updateIncome = async ({id,date,month,year,amount,source,user_id}) => {
    return db.transaction(async (trx) => {
        await trx('date_details').where({ id }).update({
            date,
            month,
            year,
            user_id

        })
        await trx('income').where({ id }).update({
            amount,
            source,
            user_id
        })
    })
}

//Delete a income entry for specific user
const deleteIncome = async (id) => {
  return db.transaction(async (trx) => {
    await trx('income').where({id}).del()
    await trx('date_details').where({id}).del()
  })
}

















module.exports = {
    getAllIncomeByUser,
    getIncomeById,
    updateIncome,
    deleteIncome,
    addIncomeWithDate
}






