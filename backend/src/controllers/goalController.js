const goalModel = require('../models/goalModel');

// Create a new goal
async function createGoal(req, res) {
  const userId = req.decoded.subject;
  const goalData = req.body;

  try {
    const goalId = await goalModel.createGoal(userId, goalData);
    res.status(201).json({ id: goalId, message: 'Goal created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all goals for a user
async function getAllGoals(req, res) {
    const userId = req.decoded.subject;

  try {
    const goals = await goalModel.getAllGoals(userId);
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update a goal
async function updateGoal(req, res) {
    const userId = req.decoded.subject;
  const goalId = req.params.id;
  const updates = req.body;

  try {
    const updatedGoal = await goalModel.updateGoal(userId, goalId, updates);
    if (updatedGoal) {
      res.status(200).json({ message: 'Goal updated successfully', goal: updatedGoal });
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete a goal
async function deleteGoal(req, res) {
    const userId = req.decoded.subject;
  const goalId = req.params.id;

  try {
    const deleted = await goalModel.deleteGoal(userId, goalId);
    if (deleted) {
      res.status(200).json({ message: 'Goal deleted successfully' });
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createGoal,
  getAllGoals,
  updateGoal,
  deleteGoal,
};
