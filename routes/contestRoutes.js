const express = require('express');
const router = express.Router();
const contestController = require('../controller/contestController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authMiddleware

// Contest-related routes
router.get('/categories', contestController.getAllCategories);
router.get('/categories/:categoryId/contestants', contestController.getContestantsByCategory);

// Protect the following routes with authentication middleware
router.use(authMiddleware);

router.post('/categories', contestController.createCategory);
router.post('/categories/:categoryId/vote', contestController.voteForContestant);

module.exports = router;

