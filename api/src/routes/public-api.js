const express = require('express');

const publicRouter = new express.Router();

const productController = require('../controllers/productController.js');
const orderController = require('../controllers/orderController.js');

// Product
publicRouter.get('/api/product', productController.getAllClient);
publicRouter.get('/api/product-latest', productController.getTheLatest);
publicRouter.get('/api/product-category', productController.getByCategory);
publicRouter.get(
  '/api/all-product-category',
  productController.getAllByCategory,
);
publicRouter.get('/api/product/detail', productController.getByIdForOrder);

// Order
publicRouter.post('/api/order', orderController.create);
publicRouter.get('/api/transaction-data', orderController.getTransactionData);

module.exports = { publicRouter };
