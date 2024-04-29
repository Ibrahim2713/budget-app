const router = require('express').Router();
const md = require('../middlewares/authMiddleWare')
const Trans = require('../models/transaction-Model')

//route that adds a new transaction log
router.post('/', md.restricted, (req,res,next) => {
    const user_id = req.decoded.subject
    Trans.addTransaction(user_id)
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
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
    Trans.updateTransactions(user_id, req.body)
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
            res.json(error)
        })
})
// route that deletes a transaction log
router.delete('/', md.restricted, (req,res,next) => {
    const user_id = req.decoded.subject
    Trans.deleteTransactions(user_id)
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
            res.json(error)
        })
})