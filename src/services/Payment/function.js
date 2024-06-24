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

const checkOrderStatus = async (client_txn_id) => {
    try {
        const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudF9pZCI6IlBSSVlBTktBMTIzIiwiaWF0IjoxNzE0OTk1MDUzLCJleHAiOjE3MjI3NzEwNTN9.iBV6gbt1053yj-pyQtnPsrxLndXgDpO3_iK1MNHEGLc"; // Replace with your actual API key
        
        const response = await axios.post('https://app.misscallpay.com/api/check_order_status', {
            key: apiKey,
            client_txn_id: client_txn_id
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
    checkOrderStatus
};
