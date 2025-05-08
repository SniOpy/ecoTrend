const client = require("../services/clientPg");

const cartDatamapper = {
  createOrder: async (informationOrder) => {

    try {
      const orderToAdd = informationOrder;

     const query = `
      INSERT INTO public."order_table" (  
      lastname, 
      firstname, 
      items, 
      address, 
      address_complement, 
      city, 
      zipcode, 
      country, 
      delivery_method, 
      payment_method, 
      total_price, 
      status_order
    ) VALUES ($1, $2, $3::jsonb, $4, $5, $6, $7, $8, $9, $10, $11, $12);
  `;


      const {
        lastname,
        firstname,
        items, 
        address,
        address_complement,
        city,
        zipcode,
        country,
        delivery_method,
        payment_method,
        totalPrice
      } = orderToAdd;
      
      const values = [
        lastname,
        firstname,
        JSON.stringify(items),
        address,
        address_complement,
        city,
        zipcode,
        country,
        delivery_method,
        payment_method,
        totalPrice,
        "en cours de traitement"
      ];

      const result = await client.query(query, values);

      console.log("✅ Insertion réussie :", result.rows[0]);
      return result.rows[0];

    } catch (error) {
      console.error("❌ Erreur lors de l'insertion :", error.message);
      throw new Error(error.message);
    }
  }
};

module.exports = cartDatamapper;
