const cartDatamapper = require('../datamapper/cartDatamapper');

const cartController = {
  findAllProducts: async (req, res) => {
    try {
      const cartProduct = await cartDatamapper.getProductsCart();

      if (!cartProduct) {
        res.status(404).json('Aucun produit dans le panier');
      }

      res.status(200).json(cartProduct);
    } catch (error) {
      console.error('Erreur de requête', error);
    }
  },
};

module.exports = cartController;
