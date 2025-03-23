const ReputationModel = require('../models/reputation');

const ReputationController = {
  updateReputation: async (req, res) => {
    const userId = req.user.uid;
    const { points, reason } = req.body;

    if (!points || !reason) {
      return res.status(400).json({ error: 'Points and reason are required' });
    }

    const result = await ReputationModel.addReputationPoints(
      userId,
      points,
      reason,
    );

    if (result.success) {
      res.json({ message: 'Reputation updated successfully' });
    } else {
      res.status(500).json({ error: 'Failed to update reputation' });
    }
  },

  getReputation: async (req, res) => {
    const userId = req.user.uid;
    const reputationScore = await ReputationModel.getReputationScore(userId);
    res.json({ reputation: reputationScore });
  },

  renderReputation: async (req, res) => {
    try {
      // const userId = req.user.uid;
      // const reputationScore = await ReputationModel.getReputationScore(userId);
      res.render('reputation/view', { reputation: null });
    } catch (error) {
      res.status(500).send('Error loading reputation');
    }
  },
};

module.exports = ReputationController;
