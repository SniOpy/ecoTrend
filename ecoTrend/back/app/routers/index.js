// Création de la route index
const express = require('express');
const router = require('./userRouter');

//! Appel des API
const userRouter = require('./userRouter');

userRouter.get('/', (req, res) => {
  res.send('API ecoTrend');
});

//! Appel des routes users
router.use(userRouter);
module.exports = router;
