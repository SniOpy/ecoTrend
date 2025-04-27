import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/products`, { withCredentials: true })
      // .get(`http://localhost:3000/products`, { withCredentials: true })
      .then((res) => {
        console.log('Données reçues :', res.data); // Vérification
        setProducts(res.data);
      })
      .catch((err) => console.error('Erreur connexion', err));
  }, []);

  return { products };
};
