const Razorpay = require('razorpay');
require('dotenv').config();

exports.createOrder = async (req, res, next) => {
    try {

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const amount = req.body.amount; // Amount in paise (i.e., 1000 paise = INR 10)
        const currency = 'INR';
        const options = {
            amount: amount,
            currency: currency,
            receipt: 'order_rcptid_11',
            payment_capture: 1,
        };

        razorpay.orders.create(options, function (err, order) {
            if (err) {
                console.log(err);
                res.status(400).json({
                    message: err,
                    success: false
                });
            } else {
                console.log("order :",order);
                res.status(200).json({
                    success: true,
                    data: order
                })
            }
        });


    } catch (err) {
        res.status(400).json({
            message: err,
            success: false
        });
    }
}