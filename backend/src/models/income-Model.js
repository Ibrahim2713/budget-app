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
const addIncomeWithDate = async ({ date, month, year, amount, category_id, user_id, description }) => {
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
        dateDetailId = newDateDetail;
      }
  
      // Step 2: Insert the income entry using the dateDetailId
      const [newIncome] = await trx('income')
        .insert({
          amount,
          category_id,
          user_id,
          date_detail_id: dateDetailId,
          description
        })
        .returning('*');
  
      return newIncome; // return the newly inserted income entry
    });
  };
  

  const updateIncome = async ({ id, date, month, year, amount, description, user_id, category_id }) => {
    return db.transaction(async (trx) => {
      // Step 1: Check if the new date and user combination already exists
      const existingDateDetail = await trx('date_details')
        .where({ date, user_id })
        .first();
  
      if (existingDateDetail && existingDateDetail.id !== id) {
        // If the combination exists and it's not the same record, use the existing date_detail_id
        await trx('income')
          .where({ id })
          .update({
            amount,
            description,
            category_id,
            user_id,
            date_detail_id: existingDateDetail.id
          });
      } else {
        // If the combination doesn't exist or it's the same record, update the date_details
        await trx('date_details')
          .where({ id })
          .update({
            date,
            month,
            year,
            user_id
          });
  
        // Update the income entry
        await trx('income')
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
  
  


//Delete a income entry for specific user
const deleteIncome = async (ids) => {
    // Ensure `ids` is always an array
    const idsArray = Array.isArray(ids) ? ids : [ids];
  
    return db.transaction(async (trx) => {
      // Delete from the 'income' table where ID is in the list of provided IDs
      await trx('income').whereIn('id', idsArray).del();
      
      // Delete from the 'date_details' table where ID is in the list of provided IDs
      await trx('date_details').whereIn('id', idsArray).del();
    });
  };
  

















module.exports = {
    getAllIncomeByUser,
    getIncomeById,
    updateIncome,
    deleteIncome,
    addIncomeWithDate
}






