const userDatamapper = require('../datamapper/userDatamapper');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userController = {
  login: async (req, res) => {
    //! Get data from Form
    const userLogged = req.body;

    if (!userLogged) {
      res.status(401).json("Vous n'avez pas accès");
    }

    const userConnected = await userDatamapper.getUserByEmail(userLogged);

    //! If user exist ,
    if (!userConnected) {
      return res.status(401).json('Couple identifiant / mot de passe incorrecte');
    }

    //! else we continue with hashing password
    const userHashedPassword = userConnected.user_password;

    const passwordUserCheck = await bcrypt.compare(userLogged.user_password, userHashedPassword);

    console.log(passwordUserCheck);
  },

  createUser: async (req, res) => {
    const newUser = req.body;
    const email = newUser.email;

    //! Checks whether data has been transmitted correctly

    if (!newUser) {
      return res.status(401).json('Error sign in');
    }

    //! if email is already in use
    try {
      const emailAlreadyExist = await userDatamapper.getUserByEmail(email);
      if (emailAlreadyExist) {
        return res.status(401).json('Cet email est déjà enregistré !');
      }

      //! verify if email is valid
      if (!validator.isEmail(email)) {
        return res.json('Email invalide');
      }

      //! else we continue with hashing password, in adding it to the user

      newUser.user_password = await bcrypt.hash(newUser.user_password, parseInt(process.env.SALT));

      //! We add user in db in calling Datamapper
      const userAdded = await userDatamapper.addUser(newUser);

      //! send a success message
      if (userAdded) {
        res.status(200).json('User added with success');
      }
    } catch (error) {
      return console.error();
    }
  },
};

module.exports = userController;
