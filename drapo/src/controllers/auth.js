const { loginUser } = require('../models/signup');

const SignupModel = require('../models/signup').default;

const AuthController = {
  signup: async (req, res) => {
    console.log(req.body);
    const {
      displayName,
      surname,
      email,
      password,
      gender,
      phone,
      dateOfBirth,
      nationality,
      nameOfFather,
      nameOfMother,
      nameOfSpouse,
      address,
    } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Email, and password are required' });
    }

    const userData = {
      displayName,
      email,
      password,
      phone,
      dateOfBirth,
      nationality,
      surname,
      gender,
      nameOfFather,
      nameOfMother,
      nameOfSpouse,
      address,
    };
    const result = await SignupModel.registerUser(userData);

    if (result.success) {
      res
        .status(201)
        .json({ message: 'User registered successfully', uid: result.uid });
    } else {
      res.status(400).json({ error: result.error });
    }
  },

  login: async (req, res) => {
    const user = await loginUser(req.body.email, req.body.password);
    if (user.success) {
      return res.redirect(`/user/dashboard?userId=${user.user.uid}`);
    }
    return res.status(401).json({ message: 'Unauthorized' });
  },

  logout: async (req, res) => {
    return res
      .status(200)
      .json({ message: 'User logged out (client-side should clear token)' });
  },

  renderLogin: async (req, res) => res.render('auth/login'),
  renderSignup: async (req, res) => res.render('auth/signup'),
};

module.exports = AuthController;
