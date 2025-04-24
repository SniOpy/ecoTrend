const cartDatamapper = require('../datamapper/cartDatamapper');

const cartController = {
  findAllProducts: async (req, res) => {
    try {
      const cartProduct = await cartDatamapper.getProductsCartById();

      if (!cartProduct) {
        return res.status(200).json({ message: 'Le panier est vide', products: [] });
      }

      res.status(200).json(cartProduct);
    } catch (error) {
      console.error('Erreur de requête', error);
    }
  },
};

module.exports = cartController;
