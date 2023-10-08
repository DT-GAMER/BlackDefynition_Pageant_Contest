const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middlewares/authentication');
const authorizationMiddleware = require('../middlewares/authorization');
const userController = require('../controllers/userController');

// Route for getting user profile by ID
router.get('/profile/:userId', userController.getUserProfile);

// Route for updating user profile
router.put('/profile/:userId', userController.updateUserProfile);

module.exports = router;

