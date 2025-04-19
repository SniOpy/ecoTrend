import React from 'react';
import styled from 'styled-components';

export default function Logo() {
  return (
    <LogoStyled>
      <h1>
        <img src="/images/logo-ecotrend.png" className="logo-image" alt="" />
        EcoTrend
      </h1>
    </LogoStyled>
  );
}

const LogoStyled = styled.div`
  .logo-image {
    height: 70px;
    object-fit: cover;
    object-position: center;
  }
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    font-size: 1.8rem;
    color: #2e7d32;
    margin-bottom: 20px;
  }
`;
