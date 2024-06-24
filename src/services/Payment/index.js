const { createPaymentOrder } = require('./function');
const { checkOrderStatus } = require('./function');

const createPaymentOrderHandler = async (req, res, next) => {
    const { client_txn_id, amount, p_info, customer_name, customer_email, customer_mobile, redirect_url, udf1, udf2, udf3 } = req.body;

    try {
        const response = await createPaymentOrder({
            client_txn_id,
            amount,
            p_info,
            customer_name,
            customer_email,
            customer_mobile,
            redirect_url,
            udf1,
            udf2,
            udf3
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
        next(error);
    }
};

const checkOrderStatusHandler = async (req, res, next) => {
    const { client_txn_id, key } = req.body;

    try {
        const response = await checkOrderStatus(client_txn_id, key);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
        next(error);
    }
};

module.exports = {
    createPaymentOrderHandler,
    checkOrderStatusHandler
};
