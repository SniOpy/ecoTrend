const cartDatamapper = {
  getProductsCart: async () => {
    try {
      const fakeCart = {
        user_id: 3,
        cart: [
          {
            product_id: 12,
            name_product: 'Mug personnalisé',
            price: 14.99,
            quantity: 2,
            image_product: 'mug.png',
          },
          {
            product_id: 7,
            name_product: 'Sac en toile',
            price: 24.9,
            quantity: 1,
            image_product: 'sac_toile.png',
          },
          {
            product_id: 5,
            name_product: 'Puzzle photo',
            price: 19.5,
            quantity: 3,
            image_product: 'puzzle.png',
          },
        ],
        total_price: 118.37,
      };
      console.log(fakeCart);

      return fakeCart;
    } catch (error) {
      console.error('Aucun produit dans le panier');
    }
  },
};

module.exports = cartDatamapper;
