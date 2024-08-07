const Expense = require('../models/expense-Model')


// Get All expenses entries for a specific user
exports.getAllExpensesByUser = async (req,res) => {

    try {
       

        const user_id = req.decoded.subject;
        const expenses = await Expense.getAllExpensesByUser(user_id);
        res.status(200).json(expenses)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}


// Get expense by ID for a specific user
exports.getExpensesById = async (req,res) => {
    try {
        const userId = req.user.id;
        const expense = await Expense.getExpensesById(userId);
      if (expense) {
        res.status(200).json(expense);
      } else{
        res.status(404).json({message: 'Expense not found'})
      }
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

// Create a new expense entry for specific user
exports.createExpense = async (req,res) => {
    const { amount, description, date, month, year, category_id } = req.body;
    const user_id = req.decoded.subject; // Extract user ID from the token

    if (!user_id) {
        return res.status(400).json({ message: 'User ID is missing in the token.' });
    }

    try {
      const response =  await Expense.addExpense({ amount, description, date, month, year, user_id, category_id });
        res.status(201).json(response);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Error adding expense', error });
    }
}


//Updates a expense entry for specific user
exports.updateExpense = async (req, res) => {
    
        const { id, amount, description, date, month, year, category_id } = req.body;
        const user_id = req.decoded.subject;
        if (!user_id) {
            return res.status(400).json({ message: 'User ID is missing in the token.' });
        }
        try {
            await Expense.updateExpense({ id, date, month, year, amount, description,category_id, user_id });
            res.status(200).json({ message: 'Expense entry updated successfully' });   
        } catch (error) {
            console.error('Error updating expense entry:', error);
            res.status(500).json({ message: 'Error updating expense entry', error });
        }
    
};

//Delete a expense entry for specific user
exports.deleteExpense = async (req, res) => {
    try {
        const {id} = req.params;
        const user_id = req.decoded.subject;

        if (!user_id) {
            return res.status(400).json({ message: 'User ID is missing in the token.' });
        }

         await Expense.deleteExpense(id)
         res.status(200).json({ message: 'Expense entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense entry:', error);
        res.status(500).json({ message: 'Error deleting expense entry', error });
    }
};

