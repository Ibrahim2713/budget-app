const router = require('express').Router();
const md = require('../middlewares/authMiddleWare');
const categoryController = require('../controllers/categoryController')

router.get('/', md.authenticated, categoryController.getAllCategoriesByUser);
router.get('/:id', md.authenticated, categoryController.getCategoryById);
router.post('/', md.authenticated, categoryController.createCategory);
router.put('/:id', md.authenticated, categoryController.updateCategory);
router.delete('/:id', md.authenticated, categoryController.deleteCategory);










module.exports = router