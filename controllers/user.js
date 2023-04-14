const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.getUserDetails = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const email = decoded.email;

        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    const data = {
                        email: user.email,
                        name: user.name,
                        paidUser: user.plan,
                        referralCode: user.referralCode,
                    }
                    res.status(200).json({
                        message: "user detail fetched successfully",
                        success: true,
                        data: data
                    })
                } else {
                    res.status(400).json({
                        message: "Invalid Token",
                        success: false,
                    })
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(404).json({
                    message: err,
                    success: false
                });
            });

    } catch (err) {
        res.status(404).json({
            message: err,
            success: false
        });
    }
}

exports.verifyReferral = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const email = decoded.email;
        const code = req.body.code;

        User.findOne({ referralCode: code }, function (err, user) {
            if (err) {
                // console.log(err);
                res.status(400).json({
                    message: "Invalid referral code",
                    success: false,
                })
            } else {
                // console.log(user);
                if (user) {
                    if (user.email === email) {
                        res.status(200).json({
                            message: "This is your referral code, other can use this not you",
                            success: false,
                        })
                    } else {
                        res.status(200).json({
                            message: "valid referral code",
                            success: true,
                        })
                    }
                } else {
                    res.status(200).json({
                        message: "Invalid referral code",
                        success: false,
                    })
                }
            }
        });
    } catch (err) {
        res.status(400).json({
            message: "Invalid referral code",
            success: false,
        })
    }
}

exports.purchasePlan = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const email = decoded.email;
        const referralCode = req.body.referralCode;

        if (referralCode.length) {
            User.findOne({ referralCode: referralCode })
                .then(doc => {
                    if (doc) {
                        User.findOneAndUpdate(
                            { email: email }, // the query to find the document
                            { $set: { plan: true, paymentDate: new Date, referredBy: doc._id } }, // the fields to update
                        )
                            .then(updatedDoc => {
                                res.status(200).json({
                                    message: "plan upgraded successfully",
                                    success: true,
                                })
                            })
                            .catch(error => {
                                res.status(400).json({
                                    message: error,
                                    success: false,
                                })
                            });
                    } else {
                        res.status(200).json({
                            message: "Invalid referral code",
                            success: false,
                        })
                    }
                })
                .catch(error => {
                    console.error(error);
                    res.status(400).json({
                        message: error,
                        success: false,
                    })
                });
        } else {
            User.findOneAndUpdate(
                { email: email }, // the query to find the document
                { $set: { plan: true, paymentDate: new Date } }, // the fields to update
            )
                .then(updatedDoc => {
                    res.status(200).json({
                        message: "plan upgraded successfully",
                        success: true,
                    })
                })
                .catch(error => {
                    res.status(400).json({
                        message: error,
                        success: false,
                    })
                });
        }
    } catch (err) {
        res.status(400).json({
            message: err,
            success: false,
        })

    }
}