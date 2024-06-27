const db = require('../../database/db-config');



const addTransaction = async  (userId, date, description, category, amount) => {
    const [id] = await db('transactions').insert({
        user_id: userId,
        date: date,
        description:description,
        category: category,
        amount: amount

    })
    return id;
}

const getTransactions = async (user_id) => {
    try{
        const trans =  db('transactions').where('user_id', user_id)
        return trans;
    }
    catch(err){
        console.log('error getting your transactions', err)
    }
}

const deleteTransactions = async (user_id,transaction_id ) => {
    try {
        const deletedTrans = await db('transactions').where({user_id: user_id, transaction_id: transaction_id}).del()
        return deletedTrans
    }
    catch(err) {
        console.log('error deleting your transaction', err)
    }
}

const updateTransactions = async (user_id, transaction_id, updatedInfo) => {
    try {
        const updatedTrans = await db('transactions').where({user_id:user_id, transaction_id: transaction_id}).update(updatedInfo)
        return updatedTrans
    } 
    catch(err) {
        console.log('error updating your transactions, err')
    }
}

/*const getTransactionsBYMonth = async (user_id, month, year) => {
    try {
        const transactionsbymonth = await db('transactions').where({user_id: user_id, })
    }
} */

module.exports = {
    addTransaction,
    getTransactions,
    deleteTransactions,
    updateTransactions

}