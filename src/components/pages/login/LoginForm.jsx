import React from 'react';
import Form from '../../../reusable-ui/Form';
import { Link } from 'react-router-dom';

export default function LoginForm({ onEmailChange, onPasswordChange, email, password }) {
  return (
    <Form email={email} password={password}>
      <input type="email" placeholder="Adresse e-mail" value={email} onChange={onEmailChange} />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={onPasswordChange}
      />

      <button type="submit">Connexion</button>

      <span className="login-link">
        Vous n'avez pas de compte ? <Link to="/signin"> Inscrivez-vous</Link>
      </span>
    </Form>
  );
}
