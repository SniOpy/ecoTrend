import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get('http://localhost:3000/cart')
        .then((res) => {
          setCartItems(res.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la requête :', error);
        });
    };

    fetchData();
  }, []);

  return (
    <CartStyled>
      <div className="container">
        <h1>Mon Panier</h1>

        {cartItems && cartItems.length === 0 ? (
          <p className="empty">Votre panier est vide 🛒</p>
        ) : (
          <div className="items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.product_id}>
                <img src={`/images/products/${item.image_product}`} alt={item.name_product} />
                <div className="details">
                  <h3>{item.name_product}</h3>
                  <p>Quantité : {item.quantity}</p>
                  <span className="price">{(item.price * item.quantity).toFixed(2)} €</span>
                </div>
                <button className="remove">×</button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="summary">
            <div className="total">
              <span>Total :</span>
              <strong>15 €</strong>
            </div>
            <button className="checkout">Valider la commande</button>
          </div>
        )}
      </div>
    </CartStyled>
  );
}

const CartStyled = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: 'Open Sans', sans-serif;
  padding: 60px 20px;

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    color: #2e7d32;
    margin-bottom: 30px;
  }

  .empty {
    font-size: 1rem;
    color: #757575;
    text-align: center;
    margin-top: 80px;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .cart-item {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    position: relative;

    img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      border-radius: 8px;
      margin-right: 20px;
    }

    .details {
      flex: 1;

      h3 {
        font-size: 1.1rem;
        margin-bottom: 4px;
        color: #212121;
      }

      p {
        font-size: 0.9rem;
        color: #757575;
        margin-bottom: 4px;
      }

      .price {
        color: #2e7d32;
        font-weight: 600;
      }
    }

    .remove {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #999;
      cursor: pointer;

      &:hover {
        color: #d32f2f;
      }
    }
  }

  .summary {
    margin-top: 40px;
    text-align: right;

    .total {
      font-size: 1.2rem;
      margin-bottom: 20px;

      span {
        margin-right: 10px;
        color: #212121;
      }

      strong {
        color: #2e7d32;
      }
    }

    .checkout {
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
