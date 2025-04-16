const express = require('express');
const userRouter = express.Router();
const { userController } = require('../controllers/index');

//! Routers GET

//! Router POST

userRouter.post('/subscribe', userController.createUser);
userRouter.post('/login', userController.login);

module.exports = userRouter;
