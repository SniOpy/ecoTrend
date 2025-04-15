const express = require('express');
const userRouter = express.Router();
// const { userController } = require('../controllers/index');

//! Routers GET
userRouter.get('subscribe', (req, res) => {
  res.send('Register page');
});
//! Router POST
// userRouter.post('/subscribe', userController.login);

module.exports = userRouter;
