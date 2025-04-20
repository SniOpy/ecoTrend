const productDatamapper = require('../datamapper/productDatamapper');

const productController = {
  findProducts: (req, res) => {
    res.json('Find products');
  },
};

module.exports = productController;
