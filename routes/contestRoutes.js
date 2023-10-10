const express = require('express');
const router = express.Router();
const contestController = require('../controller/contestController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authMiddleware

// Contest-related routes

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all contest categories
 *     tags:
 *       - Contest
 *     responses:
 *       200:
 *         description: Successfully retrieved all contest categories
 *       404:
 *         description: No contest categories found
 */
router.get('/categories', contestController.getAllCategories);

/**
 * @swagger
 * /api/categories/{categoryId}/contestants:
 *   get:
 *     summary: Get contestants by category
 *     tags:
 *       - Contest
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved contestants for the category
 *       404:
 *         description: No contestants found for the specified category
 */
router.get('/categories/:categoryId/contestants', contestController.getContestantsByCategory);


// Protect the following routes with authentication middleware
router.use(authMiddleware);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new contest category
 *     tags:
 *       - Contest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               prize:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400:
 *         description: Bad request (e.g., invalid input)
 */
router.post('/categories', contestController.createCategory);

/**
 * @swagger
 * /api/categories/{categoryId}/vote:
 *   post:
 *     summary: Vote for a contestant in a category
 *     tags:
 *       - Contest
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contestantId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vote submitted successfully
 *       400:
 *         description: Bad request (e.g., invalid input)
 *       404:
 *         description: Contestant not found for the specified category
 */
router.post('/categories/:categoryId/vote', contestController.voteForContestant);


module.exports = router;

