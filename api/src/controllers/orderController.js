const orderService = require('../services/orderService');

const create = async (req, res, next) => {
  try {
    const result = await orderService.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await orderService.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getTransactionData = async (req, res, next) => {
  try {
    const orderId = req.query.orderId;
    const result = await orderService.getTransactionData(orderId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateReceiptNumber = async (req, res, next) => {
  try {
    const result = await orderService.updateReceiptNumber(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getOrderCanceled = async (req, res, next) => {
  try {
    const result = await orderService.getOrderCanceled();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOrderPaid = async (req, res, next) => {
  try {
    const result = await orderService.getOrderPaid();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOrderShipping = async (req, res, next) => {
  try {
    const result = await orderService.getOrderShipping();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const trxNotif = async (req, res, next) => {
  try {
    const result = orderService.updateOrderData(req.body);
    res.status(200).json({ message: 'success!' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  trxNotif,
  getTransactionData,
  updateReceiptNumber,
  getOrderShipping,
  getOrderPaid,
  getOrderCanceled,
};
