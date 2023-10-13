const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Authentication routes
/**
 * @swagger
 * /auth/signup/voter:
 *   post:
 *     summary: Sign up as a voter
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Voter registration successful
 *       400:
 *         description: Bad request (e.g., invalid input)
 */
router.post('/signup/voter', authController.signupVoter);

/**
 * @swagger
 * /auth/signup/contestant:
 *   post:
 *     summary: Sign up as a contestant
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               contestName:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contestant registration successful
 *       400:
 *         description: Bad request (e.g., invalid input)
 */
router.post('/signup/contestant', authController.signupContestant);


/**
 * @swagger
 * /auth/login/voter:
 *   post:
 *     summary: Log in as a voter
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
router.post('/login/voter', authController.loginVoter);

/**
 * @swagger
 * /auth/login/contestant:
 *   post:
 *     summary: Log in as a contestant
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized (invalid credentials)
 */
router.post('/login/contestant', authController.loginContestant);


// Protect the following routes with authentication middleware
router.use(authMiddleware);

module.exports = router;

