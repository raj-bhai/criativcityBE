const express = require('express');

const razorpayController = require('../controllers/razorpay');

const router = express.Router();

router.post('/createOrder', razorpayController.createOrder);
router.post('/webhook', razorpayController.createWebhook);

module.exports = router; 