const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Authentication routes
router.post('/signup/voter', authController.signupVoter);
router.post('/signup/contestant', authController.signupContestant);
router.post('/login/voter', authController.loginVoter);
router.post('/login/contestant', authController.loginContestant);

// Protect the following routes with authentication middleware
router.use(authMiddleware);

module.exports = router;

