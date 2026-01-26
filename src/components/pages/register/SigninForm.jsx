import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSignup } from '../../../hooks/useSignup';
import { validateEmail, validateName, validatePassword, validatePasswordMatch } from '../../../utils/validation';

export default function SigninForm() {
  const { signup, loading, errors, setErrors } = useSignup();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  /**
   * Gère le changement de valeur dans les champs du formulaire
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  /**
   * Valide un champ en temps réel (optionnel, pour UX améliorée)
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let validation = { isValid: true, error: null };

    switch (name) {
      case 'firstname':
        validation = validateName(value, 'Le prénom');
        break;
      case 'lastname':
        validation = validateName(value, 'Le nom');
        break;
      case 'email':
        validation = validateEmail(value);
        break;
      case 'password':
        validation = validatePassword(value);
        break;
      case 'confirmPassword':
        validation = validatePasswordMatch(formData.password, value);
        break;
      default:
        break;
    }

    if (!validation.isValid) {
      setErrors((prev) => ({
        ...prev,
        [name]: validation.error,
      }));
    }
  };

  /**
   * Gère la soumission du formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          type="text"
          name="firstname"
          placeholder="Prénom"
          value={formData.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.firstname ? 'error' : ''}
          disabled={loading}
        />
        {errors.firstname && <ErrorMessage>{errors.firstname}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Input
          type="text"
          name="lastname"
          placeholder="Nom"
          value={formData.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.lastname ? 'error' : ''}
          disabled={loading}
        />
        {errors.lastname && <ErrorMessage>{errors.lastname}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email ? 'error' : ''}
          disabled={loading}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password ? 'error' : ''}
          disabled={loading}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.confirmPassword ? 'error' : ''}
          disabled={loading}
        />
        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
      </FormGroup>

      <SubmitButton type="submit" disabled={loading}>
        {loading ? 'Inscription en cours...' : "S'enregistrer"}
      </SubmitButton>

      <LoginLink>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </LoginLink>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }

  &.error {
    border-color: #f44336;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #f44336;
  font-size: 0.85rem;
  margin-left: 4px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 8px;

  &:hover:not(:disabled) {
    background-color: #2e7d32;
  }

  &:disabled {
    background-color: #81c784;
    cursor: not-allowed;
  }
`;

const LoginLink = styled.span`
  display: block;
  margin-top: 16px;
  font-size: 0.9rem;
  color: #757575;
  text-align: center;

  a {
    color: #2e7d32;
    font-weight: 500;
    text-decoration: none;
    margin-left: 4px;
  }

  a:hover {
    text-decoration: underline;
  }
`;
