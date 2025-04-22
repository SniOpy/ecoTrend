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

  getProductById: async (id) => {
    try {
      const query = 'SELECT * FROM "product" WHERE "id"=$1';
      const value = [id];

      const products = await client.query(query, value);
      return products.rows[0];
    } catch (error) {
      return console.error('Aucun produit ne correspond à cet identifiant');
    }
  },
};

module.exports = productDatamapper;
