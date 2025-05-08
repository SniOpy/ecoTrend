const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');

//! GET
productRouter.get('/products', productController.findProducts);
productRouter.get('/product/:id', productController.findProductById);
// productRouter.get('/cart', productController.findAllProducts);

//! POST
productRouter.post('/products', productController.findProducts);

module.exports = productRouter;
