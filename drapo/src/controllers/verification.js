const VerificationModel = require('../models/verification');

const VerificationController = {
  requestVerification: async (req, res) => {
    const userId = req.user.uid;
    const { documentId, verifier } = req.body;

    if (!documentId || !verifier) {
      return res
        .status(400)
        .json({ error: 'Document ID and verifier are required' });
    }

    const result = await VerificationModel.requestVerification(
      userId,
      documentId,
      verifier,
    );

    if (result.success) {
      res.json({
        message: 'Verification request submitted',
        requestId: result.requestId,
      });
    } else {
      res.status(500).json({ error: 'Failed to submit verification request' });
    }
  },

  checkVerificationStatus: async (req, res) => {
    const requestId = req.params.id;
    const status = await VerificationModel.getVerificationStatus(requestId);
    res.json({ requestId, status });
  },

  renderVerification: async (req, res) => {
    // const requestId = req.params.id;
    // const status = await VerificationModel.getVerificationStatus(requestId);
    res.render('verification/status', { status: null });
  },

  renderVerificationRequest: async (req, res) => {
    // const requestId = req.params.id;
    // const status = await VerificationModel.getVerificationStatus(requestId);
    res.render('verification/request', { status: null });
  },
};

module.exports = VerificationController;
