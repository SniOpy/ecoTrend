const express = require('express');
const userRouter = express.Router();
const { userController } = require('../controllers/index');

//! Routers GET

//! Router POST

userRouter.post('/login', userController.login);
// userRouter.post('/subscribe', userController.login);

userRouter.post('/subscribe', userController.createUser);

module.exports = userRouter;
