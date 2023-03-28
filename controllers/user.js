const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.getUserDetails = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader.split(" ")[1];
        const decoded = jwt.verify(token, 'my-secret-key');
        const email = decoded.email;

        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    const data = {
                        email: user.email,
                        name: user.name,
                        paidUser: user.plan
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