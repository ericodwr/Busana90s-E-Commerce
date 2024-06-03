const orderDetailsService = require('../services/orderDetailsService');

const getByOrderId = async (req, res, next) => {
  try {
    const orderId = req.query.orderId;
    const result = await orderDetailsService.getByOrderId(orderId);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getByOrderId };
