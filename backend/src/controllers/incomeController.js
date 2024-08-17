const Income = require('../models/income-Model')


// Get All income entries for a specific user
exports.getAllIncomeByUser = async (req,res) => {
    try {
     
        const userId = req.decoded.subject;
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
exports.addIncome = async (req,res) => {
    const { date, month, year, amount, category_id, description } = req.body;

    const user_id = req.decoded.subject;
    
    if (!user_id) {
        return res.status(400).json({ message: 'User ID is missing in the token.' });
      }

    try {
       const response = await Income.addIncomeWithDate({ date, month, year, amount,  user_id,category_id, description });
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Error adding income entry:', error);
        res.status(500).json({ message: 'Error adding income entry', error });
      }
    
}


//Updates a income entry for specific user
exports.updateIncome = async (req, res) => {
    const { id, date, month, year, amount, description, category_id } = req.body;

    const user_id = req.decoded.subject;
    if (!user_id) {
        return res.status(400).json({ message: 'User ID is missing in the token.' });
    }
    try {
        await Income.updateIncome({ id, date, month, year, amount, description, category_id, user_id });
        res.status(200).json({ message: 'Income entry updated successfully' });   
    } catch (error) {
        console.error('Error updating income entry:', error);
        res.status(500).json({ message: 'Error updating income entry', error });
    }
};

//Delete one or more income entries for a specific user
exports.deleteIncome = async (req, res) => {
    try {
        const { id } = req.body; // Expecting an array of IDs or a single ID in the request body
        const user_id = req.decoded.subject;

        if (!user_id) {
            return res.status(400).json({ message: 'User ID is missing in the token.' });
        }

        if (!id || (Array.isArray(id) && id.length === 0)) {
            return res.status(400).json({ message: 'No ID(s) provided for deletion.' });
        }

        await Income.deleteIncome(id); // Pass the array or single ID to the model function
        res.status(200).json({ message: 'Income entry/entries deleted successfully' });
    } catch (error) {
        console.error('Error deleting income entry:', error);
        res.status(500).json({ message: 'Error deleting income entry', error });
    }
}