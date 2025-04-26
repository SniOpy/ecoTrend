import React from 'react';
import styled from 'styled-components';
import Product from './Product';

export default function Products() {
  return (
    <ProductsStyled>
      <div className="container">
        <h1 className="title">Catalogue</h1>

        <div className="filters">
          <select>
            <option>Catégories</option>
          </select>
        </div>
        <Product />
      </div>
    </ProductsStyled>
  );
}

const ProductsStyled = styled.div`
  background-color: #fcfcfc;
  font-family: 'Open Sans', sans-serif;
  padding: 40px 20px;

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
