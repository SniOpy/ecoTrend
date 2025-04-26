import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/products', { withCredentials: true })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error('Non connecté', err));
  }, []);

  return { products };
};
