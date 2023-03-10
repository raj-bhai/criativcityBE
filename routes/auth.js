const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/Login', authController.Login);
router.post('/Register', authController.Register);

module.exports = router; 