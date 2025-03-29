const UserModel = require('../models/user');

const UserController = {
  getProfile: async (req, res) => {
    const userId = req.user.uid;
    const user = await UserModel.getUser(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  },

  updateProfile: async (req, res) => {
    const userId = req.user.uid;
    const updates = req.body;

    const result = await UserModel.updateUser(userId, updates);

    if (result.success) {
      res.json({ message: 'Profile updated successfully' });
    } else {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  },

  renderDashboard: async (req, res) => {
    try {
      // const userData = await UserModel.getUser(req.query.userId);
      // console.log(userData)
      // if (!userData) return res.redirect('/auth/login');
      res.render('dashboard/index', { user: null });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error loading dashboard');
    }
  },
};

module.exports = UserController;
