const express = require('express');

const courseController = require('../controllers/course');
const router = express.Router();

// router.get('/Add', courseController.AddCourse);

 router.get('/getAllCourse', courseController.getAllCourse);
 router.get('/getCourseById', courseController.getCourseById);

module.exports = router;    