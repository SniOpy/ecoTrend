const cartDatamapper = require('../datamapper/cartDatamapper');

const cartController = {
    addOrder: async (req, res) => {
        const informationUser = req.body;

        const order = await cartDatamapper.createOrder(informationUser);
        console.log("order : ", order);

    }



};

module.exports = cartController;
