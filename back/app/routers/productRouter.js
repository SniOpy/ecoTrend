const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');

//! GET
productRouter.get('/products', productController.findProducts);

//! POST

module.exports = productRouter;
