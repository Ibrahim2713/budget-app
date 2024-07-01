const router = require('express').Router();
const md = require('../middlewares/authMiddleWare');
const expenseController = require('../controllers/expenseController')

router.get('/', md.authenticated, expenseController.getAllExpensesByUser);
router.get('/:id', md.authenticated, expenseController.getExpensesById)
router.post('/', md.authenticated, expenseController.createExpense)
router.put('/:id',md.authenticated, expenseController.updateExpense)
router.delete('/:id', md.authenticated, expenseController.deleteExpense)



module.exports = router