const router = require('express').Router();
const md = require('../middlewares/authMiddleWare');
const savingsController = require('../controllers/savingsController');


router.get('/', md.authenticated, savingsController.getAllSavingsByUser);
router.get('/:id', md.authenticated, savingsController.getSavingsById)
router.post('/', md.authenticated, savingsController.createSavings)
router.put('/:id',md.authenticated, savingsController.updateSavings)
router.delete('/:id', md.authenticated, savingsController.deleteSavings)













module.exports = router