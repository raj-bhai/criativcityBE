const jwt = require('jsonwebtoken');
const User = require('../models/user');
const nodemailer = require('nodemailer');


exports.Login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({ email: email, password: password })
            .then((user) => {
                if (user) {
                    const token = jwt.sign({ email: user.email, name: user.name }, 'my-secret-key');
                    res.status(200).json({
                        message: "Login Succesfull",
                        success: true,
                        token: token
                    })
                } else {
                    res.status(400).json({
                        message: "Invalid credentials",
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
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: err,
            success: false
        });
    }

};

function generateRandomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

exports.Register = async (req, res, next) => {
    try {
        const email = req.body.email
        const name = req.body.name
        const password = req.body.password
        const refferalId = generateRandomString(8);
        
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                console.log(err);
                res.status(404).json({
                    message: err,
                    success: false
                });
            }
            if (user) {
                res.status(200).json({
                    message: "Email already exists",
                    success: false,
                })
            } else {
                const user = new User({
                    name: name,
                    email: email,
                    password: password,
                    referralCode: refferalId
                })
                user.save((error) => {
                    if (error) {
                        console.log(error);
                        res.status(404).json({
                            message: error,
                            success: false
                        });
                    } else {
                        const token = jwt.sign({ email: email, name: name }, 'my-secret-key');
                        res.status(200).json({
                            message: "Registration Succesfull",
                            success: true,
                            token: token
                        })
                    }
                })
            }
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: err,
            success: false
        });
    }
}

 
exports.forgotPassword = async = (req, res, next) => {
    try {

        let transporter = nodemailer.createTransport({
            host: 'rajkiranjnv@gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'rajkiranjnv1@gmail.com',
                pass: Math.random(12345678)
            }
        });
        
    } catch (err) {
        res.status(404).json({
            message: err,
            success: false
        }); 
    }
}
