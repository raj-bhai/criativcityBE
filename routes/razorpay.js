const express = require('express');

const razorpayController = require('../controllers/razorpay');

const router = express.Router();

router.post('/createOrder', razorpayController.createOrder);

module.exports = router; 