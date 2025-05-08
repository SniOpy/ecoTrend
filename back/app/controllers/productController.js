const productDatamapper = require('../datamapper/productDatamapper');

const productController = {
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
  findProducts: async (req, res) => {
    try {
      const productsFounded = await productDatamapper.getAllProducts();

      if (productsFounded) {
        res.status(200).json(productsFounded);
      }
    } catch (error) {
      console.error("Aucun produit n'a été trouvé", error);
      res.status(404).json({ message: "Aucun produit n'a été trouvé" });
    }
  },
  findProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const productFoundedById = await productDatamapper.getProductById(productId);
      res.json(productFoundedById);
    } catch (error) {
      console.error("Ce produit n'existe pas !", error);
      res.status(404).json({ message: "Aucun produit n'a été trouvé" });
    }
  },
};

module.exports = productController;
