const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Route for sending a notification
router.post('/send', notificationController.sendPasswordResetEmail);

module.exports = router;

