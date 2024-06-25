const axios = require('axios');
const Payment = require('./model/payment');

const createPaymentOrder = async (paymentData, key) => {
    const payment = new Payment(paymentData);
    await payment.save();

    const response = await axios.post('https://app.misscallpay.com/api/create_order', {
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

const getPaymentByClientTxnId = async (key, client_txn_id, txn_date) => {
    try {
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
        throw new Error(error.response ? error.response.data : error.message);
    }
};

module.exports = {
    createPaymentOrder,
    getPaymentByClientTxnId
};
