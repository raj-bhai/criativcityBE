const Course = require('../models/course');

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

