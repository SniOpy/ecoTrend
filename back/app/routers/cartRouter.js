const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/cartController');

//! Routers GET
cartRouter.get('/cart', cartController.findAllProducts);

//! Routers POST

module.exports = cartRouter;
