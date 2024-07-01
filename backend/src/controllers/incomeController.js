const Income = require('../models/income-Model')


// Get All income entries for a specific user
exports.getAllIncomeByUser = async (req,res) => {
    try {
        const userId = req.user.id;
        const incomes = await Income.getAllIncomeByUser(userId);
        res.status(200).json(incomes)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}


// Get income by ID for a specific user
exports.getIncomeById = async (req,res) => {
    try {
        const userId = req.user.id;
        const income = await Income.getIncomeById(userId);
      if (income) {
        res.status(200).json(income);
      } else{
        res.status(404).json({message: 'Income not found'})
      }
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

// Create a new income entry for specific user
exports.createIncome = async (req,res) => {
    try {
        const userId = req.user.id;
        const newIncome = await Income.getIncomeById(userId, req.body);
        res.status(201).json(newIncome)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}


//Updates a income entry for specific user
exports.updateIncome = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedIncome = await Income.updateIncome(userId, req.params.id, req.body);
        if (updatedIncome !== null) {
            res.status(200).json(updatedIncome);
        } else {
            res.status(404).json({ message: 'Income not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Delete a income entry for specific user
exports.deleteIncome = async (req, res) => {
    try {
        const userId = req.user.id;
        const deleted = await Income.deleteIncome(userId, req.params.id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Income not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


