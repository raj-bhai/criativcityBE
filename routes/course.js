const express = require('express');
const cors = require('cors');

const courseController = require('../controllers/course');
const router = express.Router();

// router.get('/Add', courseController.AddCourse);

router.get('/getAllCourse', courseController.getAllCourse);
router.get('/getCourseById', courseController.getCourseById);
router.post('/addComment', cors(), courseController.AddComment);
router.post('/getComment', courseController.getComment);

module.exports = router;    