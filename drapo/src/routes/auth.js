const express = require('express');
const AuthController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/signup', AuthController.renderSignup);
router.get('/login', AuthController.renderLogin);

module.exports = router;
