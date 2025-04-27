import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      // .get(`${import.meta.env.VITE_BACKEND_URL}/products`, { withCredentials: true })
      .get(`http://localhost:3000/products`, { withCredentials: true })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur connexion', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
};
