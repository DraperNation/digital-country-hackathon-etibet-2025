const DIDModel = require('../models/did');
const UserModel = require('../models/user');

const DIDController = {
  createDID: async (req, res) => {
    const userId = req.user.uid;

    const result = await DIDModel.createDID(userId);

    if (result.success) {
      res.json({ message: 'DID created successfully', did: result.did });
    } else {
      res.status(500).json({ error: 'Failed to create DID' });
    }
  },

  getDID: async (req, res) => {
    const userId = req.user.uid;
    const did = await DIDModel.getDID(userId);

    if (!did) {
      return res.status(404).json({ error: 'DID not found' });
    }

    res.json({ did });
  },

  renderDID: async (req, res) => {
    try {
      const userId = req.query.userId;
      const user = await UserModel.getUser(userId);

      if (!user) {
        return res.status(404).json({ error: 'DID not found' });
      }
      res.render('did/view', { did: user.did });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error loading DID');
    }
  },
};

module.exports = DIDController;
