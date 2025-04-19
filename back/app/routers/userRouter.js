const express = require('express');
const userRouter = express.Router();
const { userController } = require('../controllers/index');
const { checkTokenMember } = require('../services/tokenController');

//! Routers GET
userRouter.get('/account', checkTokenMember, userController.findUser);

//! Routers POST
userRouter.post('/signin', userController.createUser);
userRouter.post('/login', userController.login);

module.exports = userRouter;
