const productService = require('../services/productService.js');

const create = async (req, res, next) => {
  try {
    const images = req.files;
    if (Array.isArray(images) && images.length >= 0) {
      req.body.images = images;
    } else {
      throw new Error('File upload failed!');
    }
    const result = await productService.create(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const images = req.files;
    if (Array.isArray(images) && images.length >= 0) {
      req.body.images = images;
    } else {
      throw new Error('File upload failed!');
    }
    const result = await productService.updateProduct(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.query.id;
    const result = await productService.remove(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await productService.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getAllClient = async (req, res, next) => {
  try {
    const result = await productService.getAllClient();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getTheLatest = async (req, res, next) => {
  try {
    const result = await productService.getTheLatest();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const result = await productService.getById(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getByIdForOrder = async (req, res, next) => {
  try {
    const id = req.query.id;
    const result = await productService.getByIdForOrder(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getByCategory = async (req, res, next) => {
  try {
    const category = req.query.category;
    const result = await productService.getByCategory(category);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getAllByCategory = async (req, res, next) => {
  try {
    const categoryId = req.query.categoryId;
    const result = await productService.getAllByCategory(categoryId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getAllClient,
  remove,
  getById,
  getTheLatest,
  getByCategory,
  getAllByCategory,
  getByIdForOrder,
  updateProduct,
};
