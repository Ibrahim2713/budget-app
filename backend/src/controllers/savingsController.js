const Savings = require('../models/savings-Model')


// Get All income entries for a specific user
exports.getAllSavingsByUser = async (req,res) => {
    try {
        const userId = req.user.id;
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
    try {
        const userId = req.user.id;
        const savings = await Savings.createSavings(userId, req.body);
        res.status(201).json(savings)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}


//Updates a income entry for specific user
exports.updateSavings = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedSavings = await Savings.updateSavings(userId, req.params.id, req.body);
        if (updatedSavings !== null) {
            res.status(200).json(updatedSavings);
        } else {
            res.status(404).json({ message: 'Savings not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Delete a income entry for specific user
exports.deleteSavings = async (req, res) => {
    try {
        const userId = req.user.id;
        const deleted = await Savings.deleteSavings(userId, req.params.id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Savings not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

