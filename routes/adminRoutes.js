const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const authMiddleware = require('../middleware/authMiddleware');;

// Admin-related routes (authentication and authorization required)
/**
 * @swagger
 * /admin/signup/admin:
 *   post:
 *     summary: Sign up as an admin
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registration successful
 *       400:
 *         description: Bad request (e.g., invalid input)
 */
router.post('/signup/admin', adminController.signupAdmin);

/**
 * @swagger
 * /admin/login/admin:
 *   post:
 *     summary: Log in as an admin
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized (invalid credentials)
 */
router.post('/login/admin', adminController.loginAdmin);


// Protect the following routes with authentication middleware
router.use(authMiddleware);

/**
 * @swagger
 * /admin/categories:
 *   post:
 *     summary: Create a new contest category (Admin only)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
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
 *               imageUrl:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               prize:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request (e.g., invalid input)
 *       401:
 *         description: Unauthorized (admin authentication required)
 */
router.post('/categories', adminController.createCategory);

/**
 * @swagger
 * /admin/categories/{categoryId}/end:
 *   post:
 *     summary: End voting for a category (Admin only)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Voting for the category ended successfully
 *       400:
 *         description: Bad request (e.g., invalid input)
 *       401:
 *         description: Unauthorized (admin authentication required)
 */
router.post('/categories/:categoryId/end', adminController.endCategoryVoting);

/**
 * @swagger
 * /admin/categories/{categoryId}/results:
 *   get:
 *     summary: View voting results for a category (Admin only)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved voting results
 *       401:
 *         description: Unauthorized (admin authentication required)
 *       404:
 *         description: Category not found
 */
router.get('/categories/:categoryId/results', adminController.viewCategoryResults);


module.exports = router;


