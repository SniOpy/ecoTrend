const client = require('../services/clientPg');

const productDatamapper = {
  getAllProducts: async () => {
    try {
      const query = 'SELECT * FROM "product";';

      const products = await client.query(query);
      return products.rows;
    } catch (error) {
      return console.error('Aucun produit ne correspond à cette requête');
    }
  },

  getProductById: () => {},
};

module.exports = productDatamapper;
