const broadcastService = require('../services/broadcastService.js');

const create = async (req, res, next) => {
  try {
    const result = await broadcastService.create(req.body, req.headers);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.query.id;
    const result = await broadcastService.remove(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await broadcastService.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const sendBroadcast = async (req, res, next) => {
  try {
    const result = await broadcastService.sendToCustomer(req.query);
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { create, getAll, remove, sendBroadcast };
