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
      const query = `
        SELECT 
          p.*, 
          json_build_object('id', c.id, 'name_category', c.name_category) as category
        FROM 
          "product" p
        LEFT JOIN 
          "category" c
        ON 
          p."category_id" = c."id"
        WHERE 
          p."id" = $1;
      `;
      const value = [id];

      const products = await client.query(query, value);

      return products.rows[0];
    } catch (error) {
      console.error('Erreur lors de la récupération du produit :', error.message);
      return null;
    }
  },
};

module.exports = productDatamapper;
