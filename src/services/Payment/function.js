const axios = require('axios');

const createPaymentOrder = async (paymentData) => {
    try {
        const response = await axios.post('https://app.misscallpay.com/api/create_order', {
            key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudF9pZCI6IlBSSVlBTktBMTIzIiwiaWF0IjoxNzE0OTk1MDUzLCJleHAiOjE3MjI3NzEwNTN9.iBV6gbt1053yj-pyQtnPsrxLndXgDpO3_iK1MNHEGLc",
            ...paymentData
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

const checkOrderStatus = async (key, client_txn_id, txn_date) => {
    try {
        const payment = await Payment.findOne({ client_txn_id, txn_date });
        if (!payment) {
            throw new Error('Payment not found');
        }

        const response = await axios.post('https://app.misscallpay.com/api/check_order_status', {
            key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudF9pZCI6IlBSSVlBTktBMTIzIiwiaWF0IjoxNzE0OTk1MDUzLCJleHAiOjE3MjI3NzEwNTN9.iBV6gbt1053yj-pyQtnPsrxLndXgDpO3_iK1MNHEGLc",
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
