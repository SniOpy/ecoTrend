const express = require('express');
const userRouter = express.Router();

userRouter.get('/api/auth/register', (req, res) => {
  res.send('Registration');
});

module.exports = userRouter;
