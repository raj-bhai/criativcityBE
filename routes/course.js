const express = require('express');

const courseController = require('../controllers/course');
const router = express.Router();

// router.get('/Add', courseController.AddCourse);

router.get('/getAllCourse', courseController.getAllCourse);
router.get('/getCourseById', courseController.getCourseById);
router.post('/addComment', courseController.AddComment);
router.post('/getComment', courseController.getComment);
router.post('/referral', courseController.sendReferalLink);

module.exports = router;    