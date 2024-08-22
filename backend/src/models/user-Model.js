const db = require('../../database/db-config')

module.exports = {
  getUserById,
    addUser,
    findBy,
    getUserData
}

async function getUserById(userId) {
  return await db('users').where({'users.id': userId}).select('*');
}

 async function addUser(user) {
    const [id] = await db('users').insert(user)
        return id
}

async function findBy(filter){
    return db('users').where(filter)
}

async function getUserData(userId, month, year){
    try {
        
        const userData = await db('users')
          .leftJoin('categories', 'users.id', 'categories.user_id')
          .leftJoin('date_details', 'users.id', 'date_details.user_id')
          .leftJoin('expenses', 'users.id', 'expenses.user_id')
          .leftJoin('income', 'users.id', 'income.user_id')
          .leftJoin('savings', 'users.id', 'savings.user_id')
          .select(
            'users.id as userId',
            'users.email',
            'users.first_name',
            'users.last_name',
            'categories.name as categoryName',
            'date_details.date as dateDetailDate',
            'expenses.amount as expenseAmount',
            'expenses.description as expenseDescription',
            'income.amount as incomeAmount',
            'income.source as incomeSource',
            'savings.amount as savingAmount',
            'savings.description as savingDescription'
          )
          .where('users.id', userId)
          .andWhere('date_details.month', month)
          .andWhere('date_details.year', year);
  
        return userData;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    
}
