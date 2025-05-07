import React from 'react'
import { useContext } from 'react';
import styled from 'styled-components';
import LayoutContext from '../../../context/LayoutContext.jsx'

export default function Checkout() {

    const {cartItems} = useContext(LayoutContext)
    return (
        <CheckoutStyled>
          <div className="container">
            <h1>Validation de la commande</h1>
    
            <div className="content">
              {/* Adresse de livraison */}
              <div className="section">
                <h2>Adresse de livraison</h2>
                <input type="text" placeholder="Nom et Prénom" />
                <input type="text" placeholder="Adresse" />
                <input type="text" placeholder="Ville" />
                <input type="text" placeholder="Code Postal" />
                <input type="text" placeholder="Pays" />
              </div>
    
              {/* Mode de livraison */}
              <div className="section">
                <h2>Mode de livraison</h2>
                <select>
                  <option value="standard">Standard (3-5 jours) - Gratuit</option>
                  <option value="express">Express (24h) - 5.99 €</option>
                </select>
              </div>
    
              {/* Méthode de paiement */}
              <div className="section">
                <h2>Méthode de paiement</h2>
                <select>
                  <option value="credit-card">Carte Bancaire</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank-transfer">Virement Bancaire</option>
                </select>
              </div>
    
              {/* Récapitulatif */}
              <div className="section">
                <h2>Récapitulatif de commande</h2>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      {item.name} × {item.quantity} - {(item.price * item.quantity).toFixed(2)} €
                    </li>
                  ))}
                </ul>
                <div className="total">
                  <span>Total :</span>
                  <strong>150 €</strong>
                </div>
              </div>
    
              <button >Valider la commande</button>
            </div>
          </div>
        </CheckoutStyled>
      );
    }
    
    const CheckoutStyled = styled.div`
      background-color: #f9f9f9;
      min-height: 100vh;
      font-family: 'Open Sans', sans-serif;
      padding: 40px 20px;
    
      .container {
        max-width: 900px;
        margin: 0 auto;
        background-color: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }
    
      h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 2rem;
        color: #2e7d32;
        margin-bottom: 20px;
      }
    
      .content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 30px;
      }
    
      .section {
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 8px;
    
        h2 {
          margin-bottom: 16px;
          font-size: 1.2rem;
          color: #2e7d32;
        }
    
        input, select {
          width: 100%;
          padding: 12px;
          margin-bottom: 14px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
        }
    
        ul {
          list-style: none;
          padding-left: 0;
    
          li {
            margin-bottom: 10px;
            font-size: 0.95rem;
            color: #555;
          }
        }
    
        .total {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          font-size: 1.2rem;
          color: #212121;
        }
      }
    
      button {
        width: 100%;
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 14px;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        margin-top: 20px;
        transition: background-color 0.3s ease;
    
        &:hover {
          background-color: #2e7d32;
        }
      }
    `;