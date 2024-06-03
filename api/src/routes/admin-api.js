const express = require('express');

const { Admin } = require('../db/models/index.js');
const { ResponseError } = require('../error/response-error.js');
const authJwt = require('../middleware/auth-jwt.js');
const { upload } = require('../utils/fileUpload.js');

const adminController = require('../controllers/adminController.js');
const categoryController = require('../controllers/categoryController.js');
const promotionController = require('../controllers/promotionController.js');
const bannerController = require('../controllers/bannerController.js');
const productController = require('../controllers/productController.js');
const orderController = require('../controllers/orderController.js');
const orderDetailsController = require('../controllers/orderDetailsController.js');

const adminRouter = new express.Router();

// Login
adminRouter.post('/api/login', adminController.login);

// Middleware
// adminRouter.use(authJwt);

// Admin
adminRouter.get('/api/admin', adminController.get);
adminRouter.post('/api/admin', adminController.register);

// Category
adminRouter.get('/api/category', categoryController.getAll);
adminRouter.get('/api/category/name', categoryController.getByName);
adminRouter.post('/api/category', categoryController.create);
adminRouter.patch('/api/category', categoryController.update);
adminRouter.delete('/api/category', categoryController.remove);

// Product
adminRouter.get('/api/product-admin', productController.getAll);
adminRouter.patch(
  '/api/product-admin',
  upload.array('files'),
  productController.updateProduct,
);
adminRouter.get('/api/product-admin/detail', productController.getById);
adminRouter.delete('/api/product', productController.remove);
adminRouter.post(
  '/api/product',
  upload.array('files'),
  productController.create,
);

// Order
adminRouter.get('/api/order', orderController.getAll);
adminRouter.post(
  '/api/order/receipt_number',
  orderController.updateReceiptNumber,
);
adminRouter.get('/api/order/paid', orderController.getOrderPaid);
adminRouter.get('/api/order/canceled', orderController.getOrderCanceled);
adminRouter.get('/api/order/shipping', orderController.getOrderShipping);

// Order Details
adminRouter.get('/api/order-details', orderDetailsController.getByOrderId);

// Customer

// Promotion
adminRouter.get('/api/promotion', promotionController.getAll);
adminRouter.post('/api/promotion', promotionController.create);
adminRouter.delete('/api/promotion', promotionController.remove);
adminRouter.get('/api/promotion/email', promotionController.sendBroadcast);

// Banner
adminRouter.get('/api/banner', bannerController.getAll);
adminRouter.delete('/api/banner', bannerController.remove);
adminRouter.patch('/api/banner', bannerController.editStatus);
adminRouter.post('/api/banner', upload.single('file'), bannerController.create);

// Shipment

// adminRouter.post('/testing', upload.single('file'), (req, res, next) => {
//   // upload.single(req.body);
//   console.log(req.file);
//   console.log(req.body);
//   res.json({ message: 'success!' });
// });

adminRouter.get('/testjwt', (req, res, next) => {
  res.json({ message: 'Success!' });
});

module.exports = { adminRouter };
