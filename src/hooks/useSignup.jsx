import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notify } from '../utils/notify';
import { validateSignupForm } from '../utils/validation';

/**
 * Hook personnalisé pour gérer l'inscription d'un utilisateur
 * @returns {object} - État et fonctions pour l'inscription
 */
export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      return `${base}/signin`;
    } else if (isProduction && !backendUrl) {
      return 'https://ecotrend-4.onrender.com/signin';
    } else {
      return 'http://localhost:3000/signin';
    }
  };

  /**
   * Soumet le formulaire d'inscription
   * @param {object} formData - Données du formulaire
   */
  const signup = async (formData) => {
    // Réinitialiser les erreurs
    setErrors({});

    // Valider les données
    const validation = validateSignupForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      notify('error', 'Veuillez corriger les erreurs du formulaire');
      return;
    }

    setLoading(true);

    try {
      const apiUrl = getApiUrl();
      console.log('🔄 Tentative d\'inscription:', apiUrl);

      const response = await axios.post(
        apiUrl,
        {
          firstname: formData.firstname.trim(),
          lastname: formData.lastname.trim(),
          email: formData.email.trim().toLowerCase(),
          user_password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log('✅ Inscription réussie:', response.data);

      notify('success', 'Inscription réussie ! Redirection...');
      
      // Rediriger vers la page de connexion après un court délai
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('❌ Erreur lors de l\'inscription:', error);

      // Gérer les erreurs spécifiques
      if (error.response) {
        const errorMessage = error.response.data || 'Une erreur est survenue';
        
        // Si l'email existe déjà
        if (error.response.status === 401 && errorMessage.includes('déjà enregistré')) {
          setErrors({ email: 'Cet email est déjà utilisé' });
          notify('error', 'Cet email est déjà utilisé');
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
    signup,
    loading,
    errors,
    setErrors,
  };
};
