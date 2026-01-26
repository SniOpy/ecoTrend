import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LayoutContext from '../../../context/LayoutContext.jsx';
import styled from 'styled-components';
import axios from 'axios';

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const { handleAdd } = useContext(LayoutContext);

  useEffect(() => {
    // Construire l'URL correctement en gérant les slashes
    const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    
    let basedUrl;
    if (isProduction) {
      // S'assurer qu'il y a un slash entre l'URL de base et le chemin
      const base = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
      basedUrl = `${base}/product/${id}`;
    } else {
      basedUrl = `http://localhost:3000/product/${id}`;
    }

    console.log('🔄 Tentative de récupération du produit depuis:', basedUrl);
    console.log('📋 Configuration:', {
      isProduction,
      hostname: window.location.hostname,
      MODE: import.meta.env.MODE,
      PROD: import.meta.env.PROD,
      VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV,
      VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
      url: basedUrl,
    });

    setLoading(true);
    setError(null);

    axios
      .get(basedUrl, { withCredentials: true })
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Erreur lors de la récupération du produit:', err);
        console.error('📋 Détails:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          url: basedUrl,
        });
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center p-4">Chargement du produit...</div>;
  }

  if (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Erreur inconnue';
    const statusCode = error.response?.status;
    return (
      <div className="text-center text-red-500 p-4">
        <p className="font-bold">Erreur lors du chargement du produit</p>
        <p className="text-sm mt-2">{errorMessage}</p>
        {statusCode && <p className="text-xs mt-1">Code d'erreur: {statusCode}</p>}
        <p className="text-xs mt-2 text-gray-500">Vérifiez que le serveur backend est accessible</p>
      </div>
    );
  }

  if (!product || !product.id) {
    return (
      <div className="text-center p-4">
        <p>Produit introuvable</p>
      </div>
    );
  }

  return (
    <ProductPageStyled>
      <div className="container">
        <div className="image">
          <img src={`/images/products/${product.image}`} alt={product.name} />
        </div>

        <div className="details">
          <h1>{product.name}</h1>
          <p className="category">
            Catégorie : <span>{product.category?.name_category || 'Non catégorisé'}</span>
          </p>
          <p className="price">{product.price?.toFixed(2)} €</p>
          <p className="description">{product.description}</p>

          <div className="infos">
            <p>
              <strong>Matière :</strong> Coton biologique'
            </p>
            <p>
              <strong>Disponible en stock :</strong> {product.stock}
            </p>
            <p>
              <strong>Référence :</strong> #{product.id}
            </p>
          </div>

          <button onClick={() => handleAdd(product.id)}>Ajouter au panier</button>
        </div>
      </div>
    </ProductPageStyled>
  );
}

const ProductPageStyled = styled.div`
  font-family: 'Open Sans', sans-serif;
  padding: 60px 20px;
  background-color: #fcfcfa;
  min-height: 100vh;

  .container {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    gap: 40px;
    align-items: flex-start;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .image {
    flex: 1;
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

    img {
      max-width: 100%;
      max-height: 400px;
      object-fit: contain;
      border-radius: 10px;
    }
  }

  .details {
    flex: 1;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

    h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 2rem;
      margin-bottom: 10px;
      color: #2e7d32;
    }

    .category {
      font-size: 0.95rem;
      color: #757575;
      margin-bottom: 10px;

      span {
        font-weight: 600;
        color: #4caf50;
      }
    }

    .price {
      font-size: 1.5rem;
      color: #2e7d32;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .description {
      font-size: 1rem;
      color: #444;
      margin-bottom: 24px;
      line-height: 1.6;
    }

    .infos {
      font-size: 0.95rem;
      color: #555;
      margin-bottom: 24px;

      p {
        margin-bottom: 6px;
      }
    }

    button {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #2e7d32;
      }
    }
  }
`;
