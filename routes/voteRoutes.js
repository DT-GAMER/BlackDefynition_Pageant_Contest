const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

// Route for submitting a vote
router.post('/submit', voteController.submitVote);

module.exports = router;

