const categoryService = require('../services/categoryService.js');

const create = async (req, res, next) => {
  try {
    const result = await categoryService.create(req.body, req.headers);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await categoryService.edit(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await categoryService.remove(req.body.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await categoryService.getAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getByName = async (req, res, next) => {
  try {
    const name = req.query.name;
    const result = await categoryService.getByName(name);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, remove, update, getByName };
