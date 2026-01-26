import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notify } from '../utils/notify';
import { validateEmail, validatePassword } from '../utils/validation';
import { useUser } from '../context/UserContext';

/**
 * Hook personnalisé pour gérer la connexion d'un utilisateur
 * @returns {object} - État et fonctions pour la connexion
 */
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUserData } = useUser();

  /**
   * Construit l'URL de l'API selon l'environnement
   */
  const getApiUrl = () => {
    const isProduction =
      import.meta.env.PROD ||
      import.meta.env.MODE === 'production' ||
      import.meta.env.VITE_NODE_ENV === 'production' ||
      window.location.hostname !== 'localhost';

    const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

    if (isProduction && backendUrl) {
      const base = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
      return `${base}/login`;
    } else if (isProduction && !backendUrl) {
      return 'https://ecotrend-4.onrender.com/login';
    } else {
      return 'http://localhost:3000/login';
    }
  };

  /**
   * Soumet le formulaire de connexion
   * @param {object} formData - Données du formulaire { email, password }
   */
  const login = async (formData) => {
    // Réinitialiser les erreurs
    setErrors({});

    // Valider les données
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    if (!emailValidation.isValid || !passwordValidation.isValid) {
      const newErrors = {};
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.error;
      }
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.error;
      }
      setErrors(newErrors);
      notify('error', 'Veuillez corriger les erreurs du formulaire');
      return;
    }

    setLoading(true);

    try {
      const apiUrl = getApiUrl();
      console.log('🔄 Tentative de connexion:', apiUrl);

      const response = await axios.post(
        apiUrl,
        {
          email: formData.email.trim().toLowerCase(),
          user_password: formData.password,
        },
        {
          withCredentials: true, // Important pour recevoir les cookies (JWT)
        }
      );

      console.log('✅ Connexion réussie:', response.data);

      // Le JWT est stocké dans un cookie httpOnly (sécurisé)
      // On stocke les données utilisateur dans le contexte et localStorage
      const userData = response.data.user || response.data;
      
      // Stocker les données utilisateur
      setUserData(userData);
      localStorage.setItem('userData', JSON.stringify(userData));

      // Stocker aussi le token si fourni (pour référence, même si le cookie est utilisé)
      if (response.data.token) {
        // Note: Le token est déjà dans un cookie httpOnly, mais on peut le garder pour référence
        // En production, on pourrait ne pas le stocker dans localStorage pour plus de sécurité
        localStorage.setItem('token', response.data.token);
      }

      notify('success', response.data.message || 'Connexion réussie !');
      
      // Rediriger vers la page de compte
      setTimeout(() => {
        navigate('/account');
      }, 500);
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);

      // Gérer les erreurs spécifiques
      if (error.response) {
        const errorMessage = error.response.data || 'Une erreur est survenue';
        const statusCode = error.response.status;

        if (statusCode === 401) {
          // Erreur d'authentification
          setErrors({
            email: 'Email ou mot de passe incorrect',
            password: 'Email ou mot de passe incorrect',
          });
          notify('error', 'Email ou mot de passe incorrect');
        } else {
          notify('error', errorMessage);
        }
      } else if (error.request) {
        notify('error', 'Impossible de contacter le serveur. Vérifiez votre connexion.');
      } else {
        notify('error', 'Une erreur inattendue est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    errors,
    setErrors,
  };
};
