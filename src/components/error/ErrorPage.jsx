import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <Error404Styled>
      <div className="container">
        <h1>404</h1>
        <h2>Page non trouvée</h2>
        <p>Désolé, la page que vous recherchez est introuvable.</p>
        <Link to="/" className="home-button">
          Retour à l'accueil
        </Link>
      </div>
    </Error404Styled>
  );
}

const Error404Styled = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Open Sans', sans-serif;

  .container {
    text-align: center;
    padding: 20px;
  }

  h1 {
    font-size: 6rem;
    color: #4caf50;
    margin-bottom: 20px;
    font-weight: 700;
  }

  h2 {
    font-size: 2rem;
    color: #212121;
    margin-bottom: 12px;
  }

  p {
    font-size: 1rem;
    color: #757575;
    margin-bottom: 32px;
  }

  .home-button {
    background-color: #4caf50;
    color: #ffffff;
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  .home-button:hover {
    background-color: #2e7d32;
  }
`;
