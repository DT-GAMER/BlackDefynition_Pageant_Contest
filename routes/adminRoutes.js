const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const authMiddleware = require('../middleware/authMiddleware');;

// Admin-related routes (authentication and authorization required)
router.post('/signup/admin', adminController.signupAdmin);
router.post('/login/admin', adminController.loginAdmin);

// Protect the following routes with authentication middleware
router.use(authMiddleware);

router.post('/categories', adminController.createCategory);
router.post('/categories/:categoryId/end', adminController.endCategoryVoting);
router.get('/categories/:categoryId/results', adminController.viewCategoryResults);

module.exports = router;


