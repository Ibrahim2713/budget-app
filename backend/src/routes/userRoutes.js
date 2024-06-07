const router = require('express').Router();
const md = require('../middlewares/authMiddleWare')
const Trans = require('../models/transaction-Model')

//route that adds a new transaction log
router.post('/', md.restricted, (req,res,next) => {
    const user_id = req.decoded.subject
    const {date, description, amount, category} = req.body
    Trans.addTransaction(user_id,date, description, category, amount)
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
            console.log(error)
            res.json(error)
        })
})

// route that retrieves a  transaction
router.get('/', md.restricted, (req,res,next) => {
    const user_id = req.decoded.subject
    Trans.getTransactions(user_id)
    .then((response) => {
        res.json(response)
    })
    .catch((error) => {
        res.json(error)
    })
})
// route that updates a transaction log
router.put('/', md.restricted, (req,res,next) => {
    const user_id = req.decoded.subject
    const transaction_id = req.body.transaction_id
    const updatedInfo = req.body.updatedInfo
    Trans.updateTransactions(user_id, transaction_id, updatedInfo)
        .then((response) => {
            res.json('update successful')
        })
        .catch((error) => {
            res.json(error)
        })
})
// route that deletes a transaction log
router.delete('/', md.restricted, (req,res,next) => {
    const user_id = req.decoded.subject
    const transaction_id = req.body.transaction_id
    Trans.deleteTransactions(user_id, transaction_id)
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
            res.json(error)
        })
})


module.exports = router