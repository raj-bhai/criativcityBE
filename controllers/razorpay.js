const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require('crypto');
const axios = require('axios');


exports.createOrder = async (req, res, next) => {
    try {

        // ---------------------------------------------------------------------Razorpay------------------------------------------------

        // const razorpay = new Razorpay({
        //     key_id: process.env.RAZORPAY_KEY_ID,
        //     key_secret: process.env.RAZORPAY_KEY_SECRET,
        // });

        // const amount = req.body.amount; // Amount in paise (i.e., 1000 paise = INR 10)
        // const currency = 'INR';
        // const options = {
        //     amount: amount,
        //     currency: currency,
        //     receipt: 'order_rcptid_11',
        //     payment_capture: 1,
        // };

        // razorpay.orders.create(options, function (err, order) {
        //     if (err) {
        //         console.log(err);
        //         res.status(400).json({
        //             message: err,
        //             success: false
        //         });
        //     } else {
        //         console.log("order :",order);
        //         res.status(200).json({
        //             success: true,
        //             data: order
        //         })
        //     }
        // });



        // -----------------------------------------------------------Stripe----------------------------------------------------------

        // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

        // const amount  = req.body.amount;

        // try {
        //     const paymentIntent = await stripe.paymentIntents.create({
        //         currency: 'INR',
        //         metadata: { integration_check: 'accept_a_payment' },
        //         amount : amount
        //     });
        //     res.status(200).json({
        //         clientSecret: paymentIntent.client_secret
        //     })
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ error: error });
        // }

        // --------------------------------------------------------------BillDesk----------------------------------------

        const clientid = process.env.BILLDESK_MERCHANTID; // Replace with your actual clientid
        const secretkey = process.env.BILLDESK_SECRET_KEY; // Replace with your actual secret key
        const billDeskEndpoint = 'https://pguat.billdesk.io/payments/ve1_2/orders/create'; // Replace with the actual BillDesk API endpoint
        
        // Generate the JWS Header and Payload
        const jwsHeader = {
          alg: 'HS256',
          clientid,
        };
        const payload = req.body;
        
        const headers = {
          'content-type': 'application/jose',
          'bd-timestamp': '20200817132207',
          accept: 'application/jose',
          'bd-traceid': '20200817132207ABD1K',
        };
        
        // Generate the JWS-HMAC signature
        const jwsHeaderBase64 = Buffer.from(JSON.stringify(jwsHeader)).toString('base64');
        const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');
        const signature = crypto
          .createHmac('sha256', secretkey)
          .update(`${jwsHeaderBase64}.${payloadBase64}`)
          .digest('base64');
        
        // Prepare the request payload
        const requestPayload = {
          jws: `${jwsHeaderBase64}.${payloadBase64}.${signature}`,
        };
        
        console.log('req :', requestPayload)
        // Send the request to BillDesk
        const billDeskResponse = await axios.post(billDeskEndpoint, requestPayload, { headers, data: requestPayload });
        res.status(200).json(billDeskResponse.data);
        


    } catch (err) {
        console.log("err :", err);
        res.status(400).json({
            message: err,
            success: false
        });
    }
}