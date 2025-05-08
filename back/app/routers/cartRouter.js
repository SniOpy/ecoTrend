const express = require('express');
const cartController = require('../controllers/cartController');
const cartRouter = express.Router();

// cartRouter.post('/checkout', (req, res) => {
//     if (!req.body) {
//         return res.status(400).json({ message: "Le corps de la requête est vide" });
//     }

//     console.log("✅ Données reçues :", req.body);
//     res.status(201).json({
//         message: 'Commande reçue avec succès 🚀',
//         data: req.body
//     });
// });

cartRouter.post('/checkout', cartController.addOrder)

module.exports = cartRouter;
