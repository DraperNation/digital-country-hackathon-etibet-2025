const express = require('express');
const DIDController = require('../controllers/did');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.post('/create', DIDController.createDID);
router.get('/fetch', DIDController.getDID);
router.get('/view', DIDController.renderDID);

module.exports = router;
