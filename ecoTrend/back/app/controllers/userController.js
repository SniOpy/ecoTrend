const userDatamapper = require('../datamapper/userDatamapper');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {
  login: async (req, res) => {
    //! Get data from Form
    const userLogged = req.body;

    //! Verify if user exist
    if (!userLogged) {
      res.status(401).json("Vous n'avez pas accès");
    }

    const userConnected = await userDatamapper.getUserByEmail(userLogged);

    if (!userConnected) {
      return res.status(401).json('Couple identifiant / mot de passe incorrecte');
    }

    const userHashedPassword = userConnected.user_password;

    const passwordUserCheck = await bcrypt.compare(userLogged.user_password, userHashedPassword);

    console.log(passwordUserCheck);
  },

  createUser: async (req, res) => {
    const newUser = req.body;
    const email = newUser.email;
    const password = newUser.user_password;

    if (!newUser) {
      return res.status(401).json('Error sign in');
    }

    try {
      const userAlreadyExist = await userDatamapper.getUserByEmail(email);
      if (userAlreadyExist) {
        res.status(401).json('Cet email est déjà enregistré !');
      }

      const hashedpassword = await bcrypt.hash(password, saltRounds);
      newUser.user_password = hashedpassword;

      const userAdded = await userDatamapper.addUser(newUser);

      if (userAdded) {
        res.status(200).json('User added');
      }
    } catch (error) {
      return console.error();
    }
  },
};

module.exports = userController;
