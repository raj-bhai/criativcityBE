const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require('crypto');
const axios = require('axios');



function generateBdTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
  return timestamp;
}

function generateInvoiceDate() {
  // Get the current date and time
  const now = new Date();

  // Customize the date as needed
  // Example: Setting the invoice date to 3 days from the current date
  now.setDate(now.getDate() + 3);

  // Format the date as per the desired format
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const invoiceDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+05:30`;
  return invoiceDate;
}

// exports.createOrder = async (req, res, next) => {
//   try {

//     // ---------------------------------------------------------------------Razorpay------------------------------------------------

//     // const razorpay = new Razorpay({
//     //     key_id: process.env.RAZORPAY_KEY_ID,
//     //     key_secret: process.env.RAZORPAY_KEY_SECRET,
//     // });

//     // const amount = req.body.amount; // Amount in paise (i.e., 1000 paise = INR 10)
//     // const currency = 'INR';
//     // const options = {
//     //     amount: amount,
//     //     currency: currency,
//     //     receipt: 'order_rcptid_11',
//     //     payment_capture: 1,
//     // };

//     // razorpay.orders.create(options, function (err, order) {
//     //     if (err) {
//     //         console.log(err);
//     //         res.status(400).json({
//     //             message: err,
//     //             success: false
//     //         });
//     //     } else {
//     //         console.log("order :",order);
//     //         res.status(200).json({
//     //             success: true,
//     //             data: order
//     //         })
//     //     }
//     // });



//     // -----------------------------------------------------------Stripe----------------------------------------------------------

//     // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//     // const amount  = req.body.amount;

//     // try {
//     //     const paymentIntent = await stripe.paymentIntents.create({
//     //         currency: 'INR',
//     //         metadata: { integration_check: 'accept_a_payment' },
//     //         amount : amount
//     //     });
//     //     res.status(200).json({
//     //         clientSecret: paymentIntent.client_secret
//     //     })
//     // } catch (error) {
//     //     console.error(error);
//     //     res.status(500).json({ error: error });
//     // }

//     // --------------------------------------------------------------BillDesk---------------------------------------- 

//     const apiUrl = 'https://pguat.billdesk.io/payments/ve1_2/orders/create';
//     const sharedSecretKey = process.env.BILLDESK_SECRET_KEY;
//     const clientId = process.env.BILLDESK_CLIENTID; 

//     const jwsHeader = {
//       alg: 'HS256',
//       clientid: clientId
//     };
//     const encodedHeader = base64UrlEncode(JSON.stringify(jwsHeader));

//     const payload = {
//       "mercid": process.env.BILLDESK_MERCHANTID,
//       "orderid": 'order45608988',
//       "amount": '300.00',
//       "order_date": '2021-03-05T10:59:15+05:30',
//       "currency": '356',
//       "ru" : 'https://merchant.com',
//       "additional_info": {
//         "additional_info1": 'Details1',
//         "additional_info2": 'Details2'
//         },
//         "itemcode": 'DIRECT',
//         "device": {
//         "init_channel" : 'internet',
//         "ip": '124.124.1.1',
//         "mac": '11-AC-58-21-1B-AA',
//         "imei": '990000112233445',
//         "accept_header": 'text/html',
//         "fingerprintid": '61b12c18b5d0cf901be34a23ca64bb19'
//         },
//     };
//     const encodedPayload = base64UrlEncode(JSON.stringify(payload));


//     const signature = crypto.createHmac('sha256', sharedSecretKey)
//       .update(`${encodedHeader}.${encodedPayload}`)
//       .digest('base64');
//     const encodedSignature = base64UrlEncode(signature);

//     const jwsHmacToken = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;

//     const headers = {
//       'Content-Type': 'application/jose',
//       'bd-timestamp': generateBdTimestamp(),
//       'accept': 'application/jose',
//       'bd-traceid': '20200817132207ABD1K',
//       'Authorization': `Bearer ${jwsHmacToken}`
//     };

//     console.log("payload :", payload)
//     console.log("Headers :", headers)

//     axios.post(apiUrl, payload, { headers })
//       .then(response => {
//         // Process the API response
//         if (response.status === 200) {
//           const data = response.data;
//           // Process the returned data
//           console.log(data);
//           res.status(200).json(data)
//         } else {
//           throw new Error(`API request failed with status code: ${response.status}`);
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error.message);
//       });


//   } catch (err) {
//     console.log("err :", err);
//     res.status(400).json({
//       message: err,
//       success: false
//     });
//   }
// }


// Function to encode a string using base64url encoding



function base64UrlEncode(input) {
  let base64 = Buffer.from(input).toString('base64');
  base64 = base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  return base64;
}


exports.createOrder = async (req, res, next) => {
  try {
    const payload = {
      mercid: process.env.BILLDESK_MERCHANTID,
      orderid: 'GRDHHTD13244',
      amount: '300.00',
      order_date: '2020-08-17T15:19:00+0530',
      currency: '356',
      ru: 'https://www.example.com/merchant/api/pgresponse',
      additional_info: {
        additional_info1: 'Details1',
        additional_info2: 'Details2'
      },
      itemcode: 'DIRECT',
      invoice: {
        invoice_number: 'MEINVU111111221133',
        invoice_display_number: '11221133',
        customer_name: 'Tejas',
        invoice_date: '2021-09-03T13:21:5+05:30',
        gst_details: {
          cgst: '8.00',
          sgst: '8.00',
          igst: '0.00',
          gst: '16.00',
          cess: '0.00',
          gstincentive: '5.00',
          gstpct: '16.00',
          gstin: '12344567'
        }
      },
      device: {
        init_channel: 'internet',
        ip: '202.149.208.92',
        mac: '11-AC-58-21-1B-AA',
        imei: '990000112233445',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0',
        accept_header: 'text/html',
        fingerprintid: '61b12c18b5d0cf901be34a23ca64bb19'
      }
    };

    const payloadString = JSON.stringify(payload);
    const timestamp = generateBdTimestamp();

    const jwsHeader = {
      alg: 'HS256',
      clientid: process.env.BILLDESK_CLIENTID
    };

    const jwsHeaderString = base64UrlEncode(JSON.stringify(jwsHeader));
    const jwsPayloadString = base64UrlEncode(payloadString);

    const encodedData = `${jwsHeaderString}.${jwsPayloadString}`;

    const secretKey = process.env.BILLDESK_SECRET_KEY;
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(encodedData);
    const jwsSignature = base64UrlEncode(hmac.digest());

    const jwsToken = `${jwsHeaderString}.${jwsPayloadString}.${jwsSignature}`;

    const headers = {
      'Content-Type': 'application/jose',
      'bd-timestamp': timestamp,
      'Accept': 'application/jose',
      'bd-traceid': `${timestamp}ABD1K`
    };
console.log("JwsToken :", jwsToken)
    const response = await axios.post('https://pguat.billdesk.io/payments/ve1_2/orders/create', jwsToken, { headers });

    console.log('Response:', response.data);
    res.status(200).json({ data: response.data });
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json({
      message: error,
      success: false
    });
  }
};



