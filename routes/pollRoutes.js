const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middlewares/authentication');
const authorizationMiddleware = require('../middlewares/authorization');
const validation = require('../utils/validation');
const poll = require('../models/poll');
const errorHandlers = require('../utils/errorHandlers');
const pollController = require('../controllers/pollController');

// Route for creating a new poll
router.post('/contest', pollController.createPoll);

// Route for listing all polls
router.get('/voting', pollController.listPolls);

// Route for updating a poll
router.put('/results/:pollId', pollController.updatePoll);

module.exports = router;

