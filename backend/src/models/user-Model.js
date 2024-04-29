const db = require('../../database/db-config')

module.exports = {
    addUser,
    findBy,
}


 async function addUser(user) {
    const [id] = db('users').insert(user)
        return id
}

async function findBy(filter){
    return db('users').where(filter)
}