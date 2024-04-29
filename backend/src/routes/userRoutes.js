const router = require('express').Router();
const md = require('../middlewares/authMiddleWare')


//route that adds a new transaction log
router.post('/', md.restricted, (req,res,next) => {

})

// route that retrieves a  transaction
router.get('/', md.restricted, (req,res,next) => {
    
})
// route that updates a transaction log
router.put('/', md.restricted, (req,res,next) => {
    
})
// route that deletes a transaction log
router.delete('/', md.restricted, (req,res,next) => {
    
})