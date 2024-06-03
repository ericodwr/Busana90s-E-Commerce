const promotionService = require('../services/promotionService.js');

const create = async (req, res, next) => {
  try {
    const result = await promotionService.create(req.body, req.headers);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.query.id;
    const result = await promotionService.remove(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await promotionService.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const sendBroadcast = async (req, res, next) => {
  try {
    const result = await promotionService.sendToCustomer(req.query);
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { create, getAll, remove, sendBroadcast };
