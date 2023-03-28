const Course = require('../models/course');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const hbs = require('handlebars');
const consolidate = require('consolidate');
const path = require('path');


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
        Comment.find({ videoId: videoId })
            .sort({ createdAt: -1 })
            .exec((err, comments) => {
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

exports.sendReferalLink = async (req, res, next) => {
    try {
        const email = req.body.email;

        const templateVars = {
            title: 'Test Email',
            message: 'This is a test email sent from Node.js using Handlebars template!'
        };

        const emailHtml = await consolidate.handlebars(path.join(__dirname, '../emailTemplate/referral.hbs'), templateVars);

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Test email',
            html: emailHtml
           // text: 'This is a test email sent from Node.js.'
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Error :", error)
                res.status(400).json({
                    message: error,
                    success: false
                });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({
                    message: "Email sent succesfuly",
                    success: false
                });
            }
        });

    } catch (error) {
        console.log("Error :", error);
        res.status(404).json({
            message: error,
            success: false
        });
    }
}
