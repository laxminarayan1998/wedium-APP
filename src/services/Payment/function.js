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

module.exports = {
    createPaymentOrder
};
