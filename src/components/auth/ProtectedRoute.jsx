import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import axios from 'axios';

/**
 * Composant de protection de route
 * Vérifie que l'utilisateur est authentifié avant d'afficher le contenu
 */
export default function ProtectedRoute({ children }) {
  const { userData, setUserData } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Si on a déjà des données utilisateur en localStorage, les charger
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Erreur lors du parsing des données utilisateur:', error);
          localStorage.removeItem('userData');
        }
      }

      // Vérifier l'authentification avec le backend (vérifie le JWT dans le cookie)
      try {
        const getApiUrl = () => {
          const isProduction =
            import.meta.env.PROD ||
            import.meta.env.MODE === 'production' ||
            import.meta.env.VITE_NODE_ENV === 'production' ||
            window.location.hostname !== 'localhost';

          const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

          if (isProduction && backendUrl) {
            const base = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
            return `${base}/account`;
          } else if (isProduction && !backendUrl) {
            return 'https://ecotrend-4.onrender.com/account';
          } else {
            return 'http://localhost:3000/account';
          }
        };

        const apiUrl = getApiUrl();
        const response = await axios.get(apiUrl, {
          withCredentials: true, // Important pour envoyer le cookie JWT
        });

        if (response.data.user) {
          setUserData(response.data.user);
          localStorage.setItem('userData', JSON.stringify(response.data.user));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erreur de vérification d\'authentification:', error);
        
        // Si erreur 401, l'utilisateur n'est pas authentifié
        if (error.response?.status === 401) {
          localStorage.removeItem('userData');
          localStorage.removeItem('token');
          setUserData(null);
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setUserData]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <p>Vérification de l'authentification...</p>
      </div>
    );
  }

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated && !userData) {
    return <Navigate to="/login" replace />;
  }

  // Si authentifié, afficher le contenu protégé
  return <>{children}</>;
}
