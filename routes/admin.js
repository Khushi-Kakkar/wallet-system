const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin analytics and fraud logs
 */

/**
 * @swagger
 * /api/admin/flags:
 *   get:
 *     summary: Get flagged fraud transactions
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of fraud flags
 */
router.get('/flags', auth, adminController.getFlags);

/**
 * @swagger
 * /api/admin/top-users:
 *   get:
 *     summary: Get top users by balance
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/top-users', auth, adminController.topUsers);

/**
 * @swagger
 * /api/admin/total-balance:
 *   get:
 *     summary: Get total balance of all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total system balance
 */
router.get('/total-balance', auth, adminController.totalBalance);

module.exports = router;
