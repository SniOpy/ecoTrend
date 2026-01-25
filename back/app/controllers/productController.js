const productDatamapper = require('../datamapper/productDatamapper');

const productController = {
  findProducts: async (req, res) => {
    try {
      const productsFounded = await productDatamapper.getAllProducts();
      
      // Toujours retourner un tableau, même s'il est vide
      res.status(200).json(productsFounded || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
      console.error("Stack:", error.stack);
      res.status(500).json({ 
        message: "Erreur serveur lors de la récupération des produits", 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
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
