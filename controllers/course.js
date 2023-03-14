const Course = require('../models/course');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');

const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

exports.AddCourse = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: error,
            success: false
        });
    }
};

exports.getAllCourse = async (req, res, next) => {
    try {
        Course.find((err, course) => {
            if (err) {
                console.error(err);
                res.status(404).json({
                    message: err,
                    success: false
                });
            } else {
                res.status(200).json({
                    message: "success",
                    success: true,
                    data: course
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: error,
            success: false
        });
    }
}

exports.getCourseById = async (req, res, next) => {
    try {
        const id = req.query.id;
        Course.find({ id: id }, (err, course) => {
            if (err) {
                console.error(err);
                res.status(404).json({
                    message: err,
                    success: false
                });
            } else {
                res.status(200).json({
                    message: "success",
                    success: true,
                    data: course[0]
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: error,
            success: false
        });
    }
}


exports.AddComment = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader.split(" ")[1];

        const decoded = jwt.verify(token, 'my-secret-key');

        const user = decoded.name;
        const courseId = req.body.courseId;
        const videoId = req.body.videoId;
        const email = decoded.email;
        const data = req.body.data;


        const comment = new Comment({
            user: user,
            courseId: courseId,
            videoId: videoId,
            email: email,
            data: data
        })

        comment.save((error) => {
            if (error) {
                console.log(error);
                res.status(404).json({
                    message: error,
                    success: false
                });
            } else {
                // Add CORS headers here
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Credentials');
                res.setHeader('Access-Control-Allow-Credentials', 'true');

                res.status(200).json({
                    message: "Comment added Succesfull",
                    success: true,
                })
            }
        })
    } catch (err) {
        res.status(404).json({
            message: err,
            success: false
        });
    }
}


exports.getComment = async (req, res, next) => {
    try {
        const videoId = req.body.videoId;
        Comment.find({ videoId: videoId }, (err, comments) => {
            if (err) {
                console.error(err);
                res.status(404).json({
                    message: err,
                    success: false
                });
            } else {
                res.status(200).json({
                    message: "success",
                    success: true,
                    data: comments
                });
            }
        });

    } catch (err) {
        res.status(404).json({
            message: err,
            success: false
        });
    }
}

