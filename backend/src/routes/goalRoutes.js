const express = require('express');
const md = require('../middlewares/authMiddleWare')
const goalController = require('../controllers/goalController');

const router = express.Router();



// Route to create a new goal
router.post('/goals',md.authenticated , goalController.createGoal);

// Route to get all goals for a user
router.get('/goals', md.authenticated, goalController.getAllGoals);

// Route to update a goal
router.put('/goals/:id', md.authenticated, goalController.updateGoal);

// Route to delete a goal
router.delete('/goals/:id', md.authenticated, goalController.deleteGoal);

module.exports = router;
