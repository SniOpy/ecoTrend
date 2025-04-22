// Création de la route index
const express = require('express');
const router = express.Router();

//! Appel des API
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

userRouter.get('/', (req, res) => {
  res.send('API ecoTrend');
});

//! Appel des routes users
router.use(userRouter);
router.use(productRouter);

//! Export
module.exports = router;
