const IncomeCategories = require('../models/income-categories-Model');


exports.getAllCategoriesByUser = async (req,res) => {

    try {
       

        const userId = req.decoded.subject;
        const incomeCategories = await IncomeCategories.getAllIncomeCategories(userId);
        res.status(200).json(incomeCategories)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}


// Create a new category for a specific user
exports.createCategory = async (req, res) => {
    const user_id = req.decoded.subject;
    const { name} = req.body;
    try {
      const [newCategoryId] = await IncomeCategories.addIncomeCategory({
        name,
        user_id,
      });
      res.status(201).json({
        message: "Category created successfully",
        id: newCategoryId,
      });
    } catch (error) {
      console.error("Error adding category:", error);
      res.status(500).json({ message: "Error adding category", error });
    }
  };


  // Update a category for a specific user
exports.updateCategory = async (req, res) => {
    const user_id = req.decoded.subject;
    const { name,  id } = req.body;
    if (!user_id) {
      return res
        .status(400)
        .json({ message: "User ID is missing in the token." });
    }
    try {
      await IncomeCategories.updateIncomeCategory(id, { user_id, name });
      res.status(200).json({ message: "Category entry updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Delete a category for a specific user
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    const user_id = req.decoded.subject;
    try {
      if (!user_id) {
        return res
          .status(400)
          .json({ message: "User ID is missing in the token." });
      }
      await IncomeCategories.deleteIncomeCategory(id);
      res.status(200).json({ message: "Category entry deleted successfully" });
    } catch (error) {
      console.error("Error deleting categoru entry:", error);
      res.status(500).json({ message: "Error deleting category entry", error });
    }
  };