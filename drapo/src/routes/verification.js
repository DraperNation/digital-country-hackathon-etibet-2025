const express = require('express');
const VerificationController = require('../controllers/verification');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/request',

  VerificationController.requestVerification,
);
router.get(
  '/status/:id',

  VerificationController.checkVerificationStatus,
);
router.get('/view', VerificationController.renderVerification);
router.get('/request', VerificationController.renderVerificationRequest);

module.exports = router;
