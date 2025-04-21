import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';

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
        <Product products={products} />
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

  @media (max-width: 768px) {
    .filters {
      flex-direction: column;
      gap: 12px;
    }
  }
`;
