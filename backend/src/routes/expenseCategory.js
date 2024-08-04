const router = require("express").Router();
const md = require("../middlewares/authMiddleWare");
const categoryController = require("../controllers/expenseCategory-Controller");

router.get("/", md.authenticated, categoryController.getAllCategoriesByUser);
router.post("/", md.authenticated, categoryController.createCategory);
router.put("/", md.authenticated, categoryController.updateCategory);
router.delete("/:id", md.authenticated, categoryController.deleteCategory);

module.exports = router;
