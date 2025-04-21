import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/products', { withCredentials: true })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error('Non connecté', err));
  }, [products]);

  return (
    <ProductsStyled>
      <header className="header">
        <div className="logo">
          <img src="/images/logo-ecotrend.png" alt="EcoTrend logo" />
          <span>EcoTrend</span>
        </div>
      </header>

      <div className="container">
        <h1 className="title">Products</h1>

        <div className="filters">
          <select>
            <option>All Categories</option>
          </select>
          <select>
            <option>Sort by: Newest</option>
          </select>
        </div>

        <div className="grid">
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
        </div>
      </div>
    </ProductsStyled>
  );
}

const ProductsStyled = styled.div`
  background-color: #fcfcfc;
  font-family: 'Open Sans', sans-serif;
  padding: 40px 20px;

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        height: 40px;
      }

      span {
        font-size: 1.4rem;
        font-family: 'Poppins', sans-serif;
        color: #2e7d32;
        font-weight: 600;
      }
    }
  }

  .container {
    max-width: 1080px;
    margin: 0 auto;
  }

  .title {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    margin-bottom: 20px;
    color: #212121;
  }

  .filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;

    select {
      padding: 10px 14px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 24px;
  }

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

  @media (max-width: 768px) {
    .filters {
      flex-direction: column;
      gap: 12px;
    }
  }
`;
