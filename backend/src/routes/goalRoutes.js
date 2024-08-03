const express = require('express');
const md = require('../middlewares/authMiddleWare')
const goalController = require('../controllers/goalController');

const router = express.Router();



// Route to create a new goal
router.post('/',md.authenticated , goalController.createGoal);

// Route to get all goals for a user
router.get('/', md.authenticated, goalController.getAllGoals);

// Route to update a goal
router.put('/;id', md.authenticated, goalController.updateGoal);

// Route to delete a goal
router.delete('/:id', md.authenticated, goalController.deleteGoal);

module.exports = router;
