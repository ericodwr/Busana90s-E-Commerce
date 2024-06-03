const { Order_Details } = require('../db/models/index.js');
const { ResponseError } = require('../error/response-error.js');

const getByOrderId = async (orderId) => {
  const orderDetails = await Order_Details.findAll({
    where: {
      orderId,
    },
    include: ['products'],
  });
  if (!orderDetails) throw new ResponseError(404, 'category not found!');

  return orderDetails;
};

module.exports = { getByOrderId };
