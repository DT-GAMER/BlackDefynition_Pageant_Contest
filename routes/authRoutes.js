const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middlewares/authentication');
const authorizationMiddleware = require('../middlewares/authorization');
const validation = require('../utils/validation');
const errorHandlers = require('../utils/errorHandlers');
const authController = require('../controllers/authController');

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

module.exports = router;

