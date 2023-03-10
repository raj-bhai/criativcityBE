const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.Login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const token = jwt.sign({ email: email }, 'my-secret-key');
        res.status(200).json({
            message: "Login Succesfull",
            success: true,
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: err,
            success: false
        });
    }

};

exports.Register = async (req, res, next) => {
    try {
        const email = req.body.email
        const name = req.body.name
        const password = req.body.password

        const user = new User({
            name: name,
            email: email,
            password: password
        })
        user.save((error) => {
            if (error) {
                console.log(error);
                res.status(404).json({
                    message: error,
                    success: false
                });
            } else {
                const token = jwt.sign({ email: email }, 'my-secret-key');
                res.status(200).json({
                    message: "Registration Succesfull",
                    success: true,
                    token: token
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: err,
            success: false
        });
    }
}
