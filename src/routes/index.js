const auth = require('./auth');
const did = require('./did');
const credential = require('./credential');
const reputation = require('./reputation');
const verification = require('./verification');
const user = require('./user');
const { Router } = require('express');

const router = Router();

router.use('/auth', auth);
router.use('/did', did);
router.use('/credentials', credential);
router.use('/reputation', reputation);
router.use('/user', user);
router.use('/verification', verification);

module.exports = router;
