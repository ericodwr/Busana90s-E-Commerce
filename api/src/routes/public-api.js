const express = require('express');

const publicRouter = new express.Router();

const productController = require('../controllers/productController.js');
const orderController = require('../controllers/orderController.js');
const bannerController = require('../controllers/bannerController.js');
const categoryController = require('../controllers/categoryController.js');
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

// Category
publicRouter.get('/api/category-client', categoryController.getAll);

// Order
publicRouter.post('/api/order', orderController.create);
publicRouter.get('/api/transaction-data', orderController.getTransactionData);

// Banner
publicRouter.get('/api/banner-active', bannerController.getActiveBanners);

// Order
publicRouter.post(
  '/api/order/transaction/controller',
  orderController.trxNotif,
);

module.exports = { publicRouter };
