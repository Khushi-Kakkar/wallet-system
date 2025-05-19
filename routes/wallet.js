const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Wallet operations
 */

/**
 * @swagger
 * /api/wallet/deposit:
 *   post:
 *     summary: Deposit funds into wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *           example:
 *             amount: 1000
 *     responses:
 *       200:
 *         description: Deposit successful
 */
router.post('/deposit', auth, walletController.deposit);

/**
 * @swagger
 * /api/wallet/withdraw:
 *   post:
 *     summary: Withdraw funds from wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *           example:
 *             amount: 300
 *     responses:
 *       200:
 *         description: Withdrawal successful
 */
router.post('/withdraw', auth, walletController.withdraw);

/**
 * @swagger
 * /api/wallet/transfer:
 *   post:
 *     summary: Transfer funds to another user
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toUsername:
 *                 type: string
 *               amount:
 *                 type: number
 *           example:
 *             toUsername: "bob"
 *             amount: 250
 *     responses:
 *       200:
 *         description: Transfer successful
 */
router.post('/transfer', auth, walletController.transfer);

/**
 * @swagger
 * /api/wallet/history:
 *   get:
 *     summary: Get transaction history
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of transactions
 */
router.get('/history', auth, walletController.history);

module.exports = router;
