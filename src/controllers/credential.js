const CredentialModel = require('../models/credential');

const CredentialController = {
  addCredential: async (req, res) => {
    const userId = req.user.uid;
    const credentialData = req.body;

    const result = await CredentialModel.addCredential(userId, credentialData);

    if (result.success) {
      res.json({ message: 'Credential added successfully', id: result.id });
    } else {
      res.status(500).json({ error: 'Failed to add credential' });
    }
  },

  getCredentials: async (req, res) => {
    const userId = req.user.uid;
    const credentials = await CredentialModel.getCredentials(userId);
    res.json(credentials);
  },

  renderCredentials: async (req, res) => {
    res.render('credentials/view');
  },
};

module.exports = CredentialController;
