import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

export default function Navbar({ cartCount }) {
  return (
    <NavbarStyled>
      <div className="navbar-container">
        <div className="logo">
          <img src="/images/logo-ecotrend.png" alt="EcoTrend" />
          <span>EcoTrend</span>
        </div>

        <nav className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/aboutus">À propos</Link>
          <Link to="/products">Catalogue</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="cart">
          <Link to="/cart" className="cart-icon">
            <FiShoppingCart size={24} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </NavbarStyled>
  );
}

const NavbarStyled = styled.header`
  background-color: #ffffff;
  padding: 16px 40px;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'Open Sans', sans-serif;
  position: sticky;
  top: 0;
  z-index: 1000;

  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      height: 36px;
    }

    span {
      font-family: 'Poppins', sans-serif;
      font-size: 1.4rem;
      font-weight: 600;
      color: #2e7d32;
    }
  }

  .nav-links {
    display: flex;
    gap: 24px;

    a {
      text-decoration: none;
      color: #212121;
      font-weight: 500;
      transition: color 0.3s;

      &:hover {
        color: #4caf50;
      }
    }
  }

  .cart {
    position: relative;

    .cart-icon {
      color: #212121;
      position: relative;
    }

    .badge {
      position: absolute;
      top: -6px;
      right: -10px;
      background-color: #4caf50;
      color: #fff;
      font-size: 0.75rem;
      padding: 2px 6px;
      border-radius: 50%;
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
  }
`;
