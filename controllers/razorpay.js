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


function base64UrlEncode(input) {
  let base64 = Buffer.from(input).toString('base64');
  base64 = base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  return base64;
}

const decryptData = (encryptedData, secretKey) => {
  const algorithm = 'aes-256-cbc';
  const key = crypto.createHash('sha256').update(secretKey, 'utf8').digest();
  const iv = Buffer.alloc(16, 0);
  
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedData = decipher.update(encryptedData, 'base64', 'utf8');
  decryptedData += decipher.final('utf8');
  
  return decryptedData;
};



exports.createOrder = async (req, res, next) => {
  try {

    const { orderId, amount } = req.body;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/\.\d{3}/, '') + '+0530';


    const payload = {
      mercid: process.env.BILLDESK_MERCHANTID,
      orderid: orderId,
      amount: amount,
      order_date: formattedDate,
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
    const response = await axios.post('https://pguat.billdesk.io/payments/ve1_2/orders/create', jwsToken, { headers });

    // console.log('Response:', response.data);
    const encryptedParts = response.data.split('.');

    if (encryptedParts.length !== 2) {
      throw new Error('Invalid encrypted data format');
    }

    const encryptedToken = encryptedParts[0];
    const encryptedPayload = encryptedParts[1];

    const decryptedToken = decryptData(encryptedToken, secretKey);
    const decryptedPayload = decryptData(encryptedPayload, secretKey);

    console.log('Decrypted Token:', decryptedToken);
    console.log('Decrypted Payload:', decryptedPayload);
    res.status(200).json({ data: response.data});
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json({
      message: error,
      success: false
    });
  }
};



