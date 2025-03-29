const express = require('express');
const ReputationController = require('../controllers/reputation');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.post('/update', ReputationController.updateReputation);
router.get('/score', ReputationController.getReputation);
router.get('/view', ReputationController.renderReputation);

module.exports = router;
