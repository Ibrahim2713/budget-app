const router = require('express').Router();
const md = require('../middlewares/authMiddleWare');
const incomeController = require('../controllers/incomeController')

router.get('/', md.authenticated, incomeController.getAllIncomeByUser);
router.get('/:id', md.authenticated, incomeController.getIncomeById)
router.post('/', md.authenticated, incomeController.addIncome)
router.put('/',md.authenticated, incomeController.updateIncome)
router.delete('/', md.authenticated, incomeController.deleteIncome)









module.exports = router