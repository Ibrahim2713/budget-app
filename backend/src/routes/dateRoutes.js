const router = require('express').Router();
const md = require('../middlewares/authMiddleWare');
const dateDetailsController = require('../controllers/dateDetailsController');


router.get('/', md.authenticated, dateDetailsController.getAllDateDetails);
router.get('/:id', md.authenticated, dateDetailsController.getDateDetailsById);
router.get('/date/:date', md.authenticated, dateDetailsController.getDateDetailsByDate); // route for specific date
router.get('/month/:month/year/:year', md.authenticated, dateDetailsController.getDateDetailsByMonthYear); // route for specific month and year
router.post('/', md.authenticated, dateDetailsController.createDateDetails);
router.put('/:id', md.authenticated, dateDetailsController.updateDateDetails);
router.delete('/:id', md.authenticated, dateDetailsController.deleteDateDetails);



module.exports = router;