import React from 'react';
import Form from '../../../reusable-ui/Form';
import { Link } from 'react-router-dom';

export default function SigninForm() {
  return (
    <Form>
      <input type="text" placeholder="Nom" />
      <input type="text" placeholder="Prénom" />
      <input type="email" placeholder="Adresse e-mail" />
      <input type="password" placeholder="Mot de passe" />
      <input type="password" placeholder="Confirmer le mot de passe" />

      <button type="submit">S'enregistrer</button>

      <span className="login-link">
        Déjà un compte?
        <Link to="/login">Se connecter</Link>
      </span>
    </Form>
  );
}
