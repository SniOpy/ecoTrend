import React from 'react';
import styled from 'styled-components';
import { useProduct } from '../../../hooks/useProduct';
import { useFetchProducts } from '../../../hooks/useFetchProducts';

export default function Product() {
  const { handleAdd, handleRedirection } = useProduct();
  const { products } = useFetchProducts();

  return (
    <ProductStyled>
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={`/images/products/${product.image_product}`} alt={product.name_product} />
          <div className="info">
            <h3>{product.name_product}</h3>
            <p>{product.description_product}</p>
            <span className="price">{product.price.toFixed(2)} €</span>

            <div className="actions">
              <button className="btn primary" onClick={() => handleAdd(product.id)}>
                Ajouter au panier
              </button>
              <button className="btn secondary" onClick={() => handleRedirection(product.id)}>
                Fiche produit
              </button>
            </div>
          </div>
        </div>
      ))}
    </ProductStyled>
  );
}

const ProductStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 32px;
  padding: 20px;

  .card {
    background-color: #fdfaf5;
    border: 1px solid #e8e8e8;
    border-radius: 14px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
      transform: translateY(-4px);
    }

    img {
      height: 170px;
      object-fit: contain;
      margin-bottom: 20px;
      border-radius: 8px;
    }

    .info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h3 {
        font-family: 'Poppins', sans-serif;
        font-size: 1.1rem;
        margin-bottom: 8px;
        color: #2e2e2e;
      }

      p {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 12px;
        min-height: 40px;
      }

      .price {
        font-size: 1rem;
        font-weight: 600;
        color: #388e3c;
        margin-bottom: 18px;
      }

      .actions {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .btn {
          padding: 8px 14px;
          font-size: 0.9rem;
          border-radius: 5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .primary {
          background-color: #4caf50;
          color: white;

          &:hover {
            background-color: #2e7d32;
          }
        }

        .secondary {
          background-color: transparent;
          color: #4caf50;
          border: 1px solid #4caf50;

          &:hover {
            background-color: #f1fdf1;
          }
        }
      }
    }
  }
`;
