const cartDatamapper = {
  getProductsCartById: async () => {
    try {
      const fakeCart = [
        {
          product_id: 12,
          name_product: 'Mug personnalisé',
          price: 14.99,
          quantity: 2,
          image_product: 'sweater.png',
        },
        {
          product_id: 7,
          name_product: 'Sac en toile',
          price: 24.9,
          quantity: 1,
          image_product: 'tote.png',
        },
        {
          product_id: 5,
          name_product: 'Puzzle photo',
          price: 19.5,
          quantity: 3,
          image_product: 'tshirt.png',
        },
      ];

      return fakeCart;
    } catch (error) {
      console.error('Aucun produit dans le panier');
    }
  },
};

module.exports = cartDatamapper;
