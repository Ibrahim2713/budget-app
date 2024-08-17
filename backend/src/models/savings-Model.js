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



const createSavings = async ({ date, month, year, amount, description, user_id, category_id }) => {
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
  
      // Step 2: Insert the new savings entry
      const [newSavingsEntry] = await trx('savings').insert({
        amount,
        description,
        user_id,
        date_detail_id: dateDetailId,
        category_id
      }).returning('*');
  
      return newSavingsEntry;
    });
  };
  

  const updateSavings = async ({ id, date, month, year, amount, description, user_id, category_id }) => {
    return db.transaction(async (trx) => {
      // Step 1: Check if the date details exist for the given ID
      const existingDateDetail = await trx('date_details')
        .where({ date, user_id})
        .first();
  
        if (existingDateDetail && existingDateDetail.id !== id) {
     // If the combination exists and it's not the same record, use the existing date_detail_id
     await trx('savings')
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
        await trx('savings')
        .where({ id })
        .update({
          amount,
          description,
          category_id,
          user_id
        });


      }
  
      // Step 2: Update the savings entry
      
    });
  };
  

//Delete a savings entry for specific user
const deleteSavings = async (ids) => {

const idsArray = Array.isArray(ids) ? ids : [ids];

    return db.transaction(async (trx) => {
        await trx('savings').whereIn('id', idsArray).del();
        
        await trx('date_details').whereIn('id',idsArray).del()
      })
}

module.exports = {
    createSavings,
    getAllSavingsByUser,
    deleteSavings,
    updateSavings
}