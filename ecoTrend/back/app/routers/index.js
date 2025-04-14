// Création de la route index
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API ecoTrend');
});

module.exports = router;
