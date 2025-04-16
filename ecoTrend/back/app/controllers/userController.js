const userDatamapper = require('../datamapper/userDatamapper');
const bcrypt = require('bcrypt');
const validator = require('validator');
const tokenController = require('../services/tokenController');

const userController = {
  login: async (req, res) => {
    const { email, user_password } = req.body;

    if (!email || !user_password) {
      return res.status(401).json('Veuillez renseigner votre email et votre mot de passe');
    }

    if (!validator.isEmail(email)) {
      return res.status(401).json('Email invalide');
    }

    const userRegistered = await userDatamapper.getUserByEmail(email);

    if (!userRegistered) {
      res.status(401).json('Couple identifiant / mot de passe incorrecte');
    }

    const checkPassword = await bcrypt.compare(user_password, userRegistered.user_password);

    if (!checkPassword) {
      return res.status(401).json('Couple identifiant / mot de passe incorrecte');
    }
    delete userRegistered.user_password;
    const { id, role_user } = userRegistered;
    const token = tokenController.createToken(id, role_user);
    userRegistered.token = token;

    res.cookie('access_token', 'Bearer ' + token, {
      expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
      httpOnly: true,
    });

    res.status(200).json(userRegistered);
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
