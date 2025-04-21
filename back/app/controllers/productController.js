const productDatamapper = require('../datamapper/productDatamapper');

const productController = {
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
  findProductById: (req, res) => {
    res.json('product by id');
  },
};

module.exports = productController;
