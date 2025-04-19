import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useUser } from '../../../hooks/UserContext.jsx';
import axios from 'axios';

export default function AccountPage() {
  const { userData, setUserData } = useUser();

  useEffect(() => {
    const storedData = localStorage.getItem('userData');

    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
    axios
      .get('http://localhost:3000/account', { withCredentials: true })
      .then((res) => {
        setUserData(res.data.user);
        localStorage.setItem('userData', JSON.stringify(res.data.user));
      })
      .catch((err) => console.error('Non connecté', err));
  }, []);

  return (
    <AccountStyled>
      <div className="account-wrapper">
        {/* Left side - Affichage du profil */}
        <div className="account-container">
          <div className="logo">EcoTrend</div>
          <h1>Mon Compte</h1>
          <img src="/images/avatar.png" alt="Avatar" className="avatar" />
          <h2>
            {userData.lastname} {userData.firstname}
          </h2>
          <p className="email">{userData.email}</p>

          <div className="profile-details">
            <div className="row">
              <span>Nom</span>
              <span>{userData.lastname}</span>
            </div>

            <div className="row">
              <span>Prénom</span>
              <span>{userData.firstname}</span>
            </div>
            <div className="row">
              <span>Email</span>
              <span>{userData.email}</span>
            </div>
            <div className="row">
              <span>Adresse</span>
              <span>{userData.address ? userData.address : <em>Vide</em>}</span>
            </div>
            <div className="row">
              <span>Mot de passe</span>
              <span>••••••••</span>
            </div>
          </div>
        </div>

        {/* Right side - Formulaire de modification */}
        <div className="form-side">
          <h2>Modifier mes informations</h2>
          <form className="edit-form">
            <label>
              Nom
              <input type="text" name="name" value={userData.firstname} />
            </label>
            <label>
              Email
              <input type="email" name="email" value={userData.email} />
            </label>
            <label>
              Adresse
              <input type="text" name="address" />
            </label>
            <label>
              Nouveau mot de passe
              <input type="password" name="password" />
            </label>
            <button type="submit">Mettre à jour</button>
            <button type="submit" className="logout">
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </AccountStyled>
  );
}

const AccountStyled = styled.div`
  background: url('/images/background-leaves.jpg') no-repeat center center/cover;
  min-height: 100vh;
  padding: 40px;
  font-family: 'Open Sans', sans-serif;

  .account-wrapper {
    display: flex;
    gap: 40px;
    max-width: 1100px;
    margin: 0 auto;
    background: white;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  .account-container {
    flex: 1;
    text-align: center;
    border-right: 1px solid #eee;
    padding-right: 20px;

    .logo {
      font-family: 'Poppins', sans-serif;
      color: #2e7d32;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 20px;
    }

    h1 {
      font-size: 1.8rem;
      color: #212121;
    }

    .avatar {
      margin: 20px auto;
      height: 80px;
      width: 80px;
      border-radius: 50%;
    }

    h2 {
      font-size: 1.2rem;
      margin-bottom: 4px;
      color: #2e7d32;
    }

    .email {
      font-size: 0.9rem;
      color: #757575;
    }

    .profile-details {
      margin-top: 30px;
      text-align: left;

      .row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #ddd;

        &:last-child {
          border-bottom: none;
        }

        span:first-child {
          color: #757575;
        }

        span:last-child {
          font-weight: 500;
        }
      }
    }
  }

  .form-side {
    flex: 1;
    padding-left: 20px;

    h2 {
      font-family: 'Poppins', sans-serif;
      color: #212121;
      margin-bottom: 20px;
    }

    .edit-form {
      display: flex;
      flex-direction: column;
      gap: 16px;

      label {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
        color: #444;
      }

      input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
        margin-top: 4px;
      }

      input:focus {
        border-color: #4caf50;
        outline: none;
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
      }

      button {
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 12px;
        font-weight: 600;
        font-size: 1rem;
        margin-top: 10px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .logout {
        background-color: #e92b2b;
      }

      .logout:hover {
        background: #9e1f1f;
      }

      button:hover {
        background-color: #2e7d32;
      }
    }
  }

  @media (max-width: 768px) {
    .account-wrapper {
      flex-direction: column;
      padding: 20px;
    }

    .account-container {
      border-right: none;
      border-bottom: 1px solid #eee;
      padding-right: 0;
      padding-bottom: 20px;
    }

    .form-side {
      padding-left: 0;
    }
  }
`;
