const express = require('express');
const UserController = require('../controllers/user');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);
router.get('/dashboard', UserController.renderDashboard);

module.exports = router;
