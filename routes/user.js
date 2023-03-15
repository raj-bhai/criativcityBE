const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/getUserDetail', userController.getUserDetails);

module.exports = router; 