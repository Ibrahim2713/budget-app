const db = require('../../database/db-config');



// Create a new goal for a specific user
async function createGoal(userId, goal) {
  try {
    const [id] = await db('goals').insert({ ...goal, user_id: userId }).returning('id');
    return id;
  } catch (error) {
    throw new Error('Error creating goal: ' + error.message);
  }
}



// Get all goals for a specific user
async function getAllGoals(userId) {
  try {
    const goals = await db('goals').where({ user_id: userId }).select('*');
    return goals;
  } catch (error) {
    throw new Error('Error retrieving goals: ' + error.message);
  }
}

// Update a goal for a specific user
async function updateGoal(userId, id, updates) {
  try {
    await knex('goals').where({ id, user_id: userId }).update(updates);
    return { id, ...updates };
  } catch (error) {
    throw new Error('Error updating goal: ' + error.message);
  }
}

// Delete a goal for a specific user
async function deleteGoal(userId, id) {
  try {
    await knex('goals').db({ id, user_id: userId }).del();
    return id;
  } catch (error) {
    throw new Error('Error deleting goal: ' + error.message);
  }
}

module.exports = {
  createGoal,
  getAllGoals,
  updateGoal,
  deleteGoal,
};
