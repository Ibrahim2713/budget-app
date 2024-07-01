const Expense = require('../models/expense-Model')


// Get All expenses entries for a specific user
exports.getAllExpensesByUser = async (req,res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.getAllExpensesByUser(userId);
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
    try {
        const userId = req.user.id;
        const newExpense = await Expense.createExpense(userId, req.body);
        res.status(201).json(newExpense)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}


//Updates a expense entry for specific user
exports.updateExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedExpense = await Expense.updateExpense(userId, req.params.id, req.body);
        if (updatedExpense !== null) {
            res.status(200).json(updatedExpense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Delete a expense entry for specific user
exports.deleteExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const deleted = await Expense.deleteExpense(userId, req.params.id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

