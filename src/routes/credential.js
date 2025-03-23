const express = require('express');
const CredentialController = require('../controllers/credential');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.post('/add', CredentialController.addCredential);
router.get('/list', CredentialController.getCredentials);
router.get('/view', CredentialController.renderCredentials);

module.exports = router;
