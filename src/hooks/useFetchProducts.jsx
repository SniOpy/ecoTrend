import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Détecter si on est en production
    // Vite fournit import.meta.env.PROD et import.meta.env.MODE
    const isProduction =
      import.meta.env.PROD ||
      import.meta.env.MODE === 'production' ||
      import.meta.env.VITE_NODE_ENV === 'production' ||
      window.location.hostname !== 'localhost';

    // Construire l'URL correctement en gérant les slashes
    const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

    let basedUrl;
    if (isProduction && backendUrl) {
      // S'assurer qu'il y a un slash entre l'URL de base et le chemin
      const base = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
      basedUrl = `${base}/products`;
    } else if (isProduction && !backendUrl) {
      // Fallback si VITE_BACKEND_URL n'est pas défini mais qu'on est en production
      console.warn("⚠️ VITE_BACKEND_URL non défini, utilisation de l'URL par défaut");
      basedUrl = 'https://ecotrend-4.onrender.com/products';
    } else {
      basedUrl = `http://localhost:3000/products`;
    }

    console.log('🔄 Tentative de récupération des produits');
    console.log('📋 Configuration:', {
      isProduction,
      hostname: window.location.hostname,
      MODE: import.meta.env.MODE,
      PROD: import.meta.env.PROD,
      VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV,
      VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
      url: basedUrl,
    });

    axios
      .get(basedUrl, { withCredentials: true })
      .then((res) => {
        console.log('✅ Produits récupérés:', res.data);
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Erreur lors de la récupération des produits:', err);
        console.error('📋 Détails:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          url: basedUrl,
          config: {
            VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV,
            VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
          },
        });
        setError(err);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
};
