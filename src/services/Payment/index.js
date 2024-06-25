const { createPaymentOrder, checkOrderStatus } = require('./function');

// Handler to create a payment order
const createPaymentOrderHandler = async (req, res, next) => {
    const { client_txn_id, amount, p_info, customer_name, customer_email, customer_mobile, redirect_url, udf1, udf2, udf3, key } = req.body;

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
        }, key);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
        next(error);
    }
};

// Handler to check the order status
const checkOrderStatusHandler = async (req, res, next) => {
    const { key, client_txn_id, txn_date } = req.body;

    try {
        const response = await checkOrderStatus(key, client_txn_id, txn_date);
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
