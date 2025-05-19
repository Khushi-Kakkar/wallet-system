const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth'); // optional protection

router.get('/flags', auth, adminController.getFlags);
router.get('/top-users', auth, adminController.topUsers);
router.get('/total-balance', auth, adminController.totalBalance);

module.exports = router;
