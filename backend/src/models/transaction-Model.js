const db = require('../../database/db-config');



const addTransaction = async  (transaction) => {
    const [id] = db('transactions').insert(transaction)
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

const deleteTransactions = async (user_id) => {
    try {
        const deletedTrans = await db('transactions').where('user_id', user_id).del()
        return deletedTrans
    }
    catch(err) {
        console.log('error deleting your transaction', err)
    }
}

const updateTransactions = async (user_id, updatedInfo) => {
    try {
        const updatedTrans = await db('transactions').where('user_id',user_id).update(updatedInfo)
        return updatedTrans
    } 
    catch(err) {
        console.log('error updating your transactions, err')
    }
}

module.exports = {
    addTransaction,
    getTransactions,
    deleteTransactions,
    updateTransactions

}