const userDatamapper = require('../datamapper/userDatamapper');
const bcrypt = require('bcrypt');
const validator = require('validator');
const tokenController = require('../services/tokenController');
require('dotenv').config();

const userController = {
  login: async (req, res) => {
    try {
      const { email, user_password } = req.body;

      // Validation des champs requis
      if (!email || !user_password) {
        return res.status(400).json({
          success: false,
          message: 'Veuillez renseigner votre email et votre mot de passe',
          errors: {
            email: !email ? 'L\'email est requis' : null,
            password: !user_password ? 'Le mot de passe est requis' : null,
          },
        });
      }

      // Validation de l'email
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Email invalide',
          errors: {
            email: 'Format d\'email invalide',
          },
        });
      }

      // Vérifier si l'utilisateur existe
      const userRegistered = await userDatamapper.getUserByEmail(email);

      if (!userRegistered) {
        return res.status(401).json({
          success: false,
          message: 'Email ou mot de passe incorrect',
        });
      }

      // Vérifier le mot de passe
      const checkPassword = await bcrypt.compare(user_password, userRegistered.user_password);

      if (!checkPassword) {
        return res.status(401).json({
          success: false,
          message: 'Email ou mot de passe incorrect',
        });
      }

      // Supprimer le mot de passe de l'objet utilisateur
      delete userRegistered.user_password;

      // Créer le token JWT
      const { id, role_user } = userRegistered;
      const token = tokenController.createToken(id, role_user);

      // Définir le cookie avec le token (httpOnly pour la sécurité)
      const isProduction = process.env.NODE_ENV === 'production';
      
      res.cookie('access_token', 'Bearer ' + token, {
        expires: new Date(Date.now() + 8 * 3600000), // 8 heures
        httpOnly: true, // Empêche l'accès JavaScript (sécurité XSS)
        sameSite: isProduction ? 'none' : 'lax', // Pour CORS en production
        maxAge: 8 * 3600000, // 8 heures en millisecondes
        secure: isProduction, // HTTPS uniquement en production
        path: '/', // Accessible sur tout le site
      });

      // Retourner la réponse avec les données utilisateur et le token
      return res.status(200).json({
        success: true,
        message: 'Connexion réussie',
        user: userRegistered,
        token, // Token aussi dans la réponse (pour référence, mais le cookie est utilisé)
      });
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la connexion',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const { firstname, lastname, email, user_password } = req.body;

      // Validation des champs requis
      if (!firstname || !lastname || !email || !user_password) {
        return res.status(400).json({
          success: false,
          message: 'Tous les champs sont requis',
          errors: {
            firstname: !firstname ? 'Le prénom est requis' : null,
            lastname: !lastname ? 'Le nom est requis' : null,
            email: !email ? 'L\'email est requis' : null,
            password: !user_password ? 'Le mot de passe est requis' : null,
          },
        });
      }

      // Validation de l'email
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Email invalide',
          errors: {
            email: 'Format d\'email invalide',
          },
        });
      }

      // Vérifier si l'email existe déjà
      const emailAlreadyExist = await userDatamapper.getUserByEmail(email);
      if (emailAlreadyExist) {
        return res.status(409).json({
          success: false,
          message: 'Cet email est déjà enregistré',
          errors: {
            email: 'Cet email est déjà utilisé',
          },
        });
      }

      // Validation du mot de passe (minimum 6 caractères)
      if (user_password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Le mot de passe doit contenir au moins 6 caractères',
          errors: {
            password: 'Le mot de passe doit contenir au moins 6 caractères',
          },
        });
      }

      // Hash du mot de passe
      const saltRounds = parseInt(process.env.SALT) || 10;
      const hashedPassword = await bcrypt.hash(user_password, saltRounds);

      // Préparer les données utilisateur
      const newUser = {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim().toLowerCase(),
        user_password: hashedPassword,
      };

      // Ajouter l'utilisateur en base de données
      const userAdded = await userDatamapper.addUser(newUser);

      if (userAdded && !userAdded.message) {
        // Succès - ne pas retourner le mot de passe
        const { user_password: _, ...userWithoutPassword } = newUser;
        return res.status(201).json({
          success: true,
          message: 'Utilisateur créé avec succès',
          user: {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
          },
        });
      } else {
        // Erreur lors de l'ajout en base
        return res.status(500).json({
          success: false,
          message: 'Erreur lors de la création de l\'utilisateur',
          error: userAdded?.message || 'Erreur inconnue',
        });
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la création de l\'utilisateur',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  },

  findUser: async (req, res) => {
    try {
      const userId = req.user.id;
      if (!userId) {
        return res.status(401).json('Aucun id est renseigné');
      }

      const userFound = await userDatamapper.getUserById(userId);
      res.status(200).json({ user: userFound });
    } catch (error) {}
  },
};
module.exports = userController;
