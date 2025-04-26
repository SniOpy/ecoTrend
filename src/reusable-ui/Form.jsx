import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import styled from 'styled-components';
import axios from 'axios';

export default function Form({ children, email, password }) {
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // Important to includ cookies
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/login', {
        email,
        user_password: password,
      });

      await setUserData(response.data);
      navigate('/account');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <FormStyled className="form-register" onSubmit={handleSubmit}>
        {children}
      </FormStyled>
    </div>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;

  input {
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    transition: border-color 0.3s ease;
  }

  input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }

  button {
    background-color: #4caf50;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    padding: 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #2e7d32;
  }

  .login-link {
    display: block;
    margin-top: 16px;
    font-size: 0.9rem;
    color: #757575;
  }

  .login-link a {
    color: #2e7d32;
    font-weight: 500;
    text-decoration: none;
  }

  .login-link a:hover {
    text-decoration: underline;
  }
`;
