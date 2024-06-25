const axios = require('axios');
const Payment = require('./model/payment');

const createPaymentOrder = async (paymentData, key) => {
    const payment = new Payment(paymentData);
    await payment.save();

    const response = await axios.post('https://app.misscallpay.com/api/create_order', {
        key: key,
        ...paymentData
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    payment.status = response.data.status ? 'PENDING' : 'FAILED';
    await payment.save();

    return response.data;
};

const getPaymentByClientTxnId = async (client_txn_id,txn_date) => {
    try {
        const payment = await Payment.findOne({ client_txn_id,txn_date });
        return payment;
    } catch (error) {
        throw new Error(`Error fetching payment by client transaction ID: ${error.message}`);
    }
};

module.exports = {
    createPaymentOrder,
    getPaymentByClientTxnId
};
