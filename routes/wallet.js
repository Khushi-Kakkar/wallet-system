const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const auth = require('../middlewares/auth');

router.post('/deposit', auth, walletController.deposit);
router.post('/withdraw', auth, walletController.withdraw);
router.post('/transfer', auth, walletController.transfer);
router.get('/history', auth, walletController.history);

module.exports = router;
