const Savings = require('../models/savings-Model')


// Get All income entries for a specific user
exports.getAllSavingsByUser = async (req,res) => {
    try {
      
        const userId = req.decoded.subject;
        const savings = await Savings.getAllSavingsByUser(userId);
        res.status(200).json(savings)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}


// Get income by ID for a specific user
exports.getSavingsById = async (req,res) => {
    try {
        const userId = req.user.id;
        const savings = await Savings.getSavingsById(userId);
      if (savings) {
        res.status(200).json(savings);
      } else{
        res.status(404).json({message: 'Savings not found'})
      }
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

// Create a new income entry for specific user
exports.createSavings = async (req,res) => {
    const user_id = req.decoded.subject;
    const { date, month, year, amount, description, category_id } = req.body;
    try {
        if (!user_id) {
            return res.status(400).json({ message: 'User ID is missing in the token.' });
          }
     await Savings.createSavings({date, month, year, amount, description, user_id, category_id});
     res.status(201).json({ message: 'Savings entry added successfully' });
    }
    catch(error){
        console.error('Error adding Savings entry:', error);
        res.status(500).json({ message: 'Error adding savings entry', error });
    }
}


//Updates a income entry for specific user
exports.updateSavings = async (req, res) => {
    const { id, date, month, year, amount, description } = req.body;
    const user_id = req.decoded.subject;
    if (!user_id) {
        return res.status(400).json({ message: 'User ID is missing in the token.' });
    }
    try {
    
         await Savings.updateSavings({ id, date,month, year, amount, description, user_id});
         res.status(200).json({ message: 'Savings entry updated successfully' });   
    } catch (error) {
        console.error('Error updating income entry:', error);
        res.status(500).json({ message: 'Error updating income entry', error });
    }
};

//Delete a income entry for specific user
exports.deleteSavings = async (req, res) => {
    try {
        const {id} = req.params;
        const user_id = req.decoded.subject;

        if (!user_id) {
            return res.status(400).json({ message: 'User ID is missing in the token.' });
        }

         await Savings.deleteSavings(id);
         res.status(200).json({ message: 'Savings entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting savings entry:', error);
        res.status(500).json({ message: 'Error deleting savings entry', error });
    }
};

