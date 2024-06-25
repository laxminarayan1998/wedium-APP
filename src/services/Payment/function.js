const axios = require('axios');
const Payment = require('./model/payment');

// Function to create a payment order
const createPaymentOrder = async (paymentData, key) => {
    try {
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
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Function to check the order status
const checkOrderStatus = async (key, client_txn_id, txn_date) => {
    try {
        const payment = await Payment.findOne({ client_txn_id, txn_date });
        if (!payment) {
            throw new Error('Payment not found');
        }

        const response = await axios.post('https://app.misscallpay.com/api/check_order_status', {
            key: key,
            client_txn_id: client_txn_id,
            txn_date: txn_date
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error fetching payment by client transaction ID: ${error.message}`);
    }
};

module.exports = {
    createPaymentOrder,
    checkOrderStatus
};
