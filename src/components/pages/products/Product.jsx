import React from 'react';
import styled from 'styled-components';

export default function Product({ products }) {
  return (
    <ProductStyled>
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={`/images/products/${product.image_product}`} alt={product.name_product} />
          <div className="info">
            <h3>{product.name_product}</h3>
            <p>{product.description_product}</p>
            <span className="price">{product.price.toFixed(2)} €</span>
            <br />
            <button className="add-to-cart">Ajouter au panier</button>
          </div>
        </div>
      ))}
    </ProductStyled>
  );
}

const ProductStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 24px;

  .card {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
      transform: translateY(-4px);
    }

    img {
      height: 180px;
      object-fit: contain;
      margin-bottom: 16px;
    }

    .info {
      flex-grow: 1; /* prend l'espace restant */
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h3 {
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        margin-bottom: 6px;
        color: #212121;
      }

      p {
        font-size: 0.9rem;
        color: #757575;
        margin-bottom: 8px;
      }

      .price {
        font-weight: 600;
        font-size: 1rem;
        color: #2e7d32;
        margin-bottom: 16px;
      }

      .add-to-cart {
        margin-top: auto;
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 6px;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #2e7d32;
        }
      }
    }
  }
`;
