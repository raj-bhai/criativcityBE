const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/getUserDetail', userController.getUserDetails);
// router.post('/forgetPassword', userController.getUserDetails);

router.post('/verifyReferral', userController.verifyReferral);
router.post('/  ', userController.purchasePlan);

module.exports = router; 