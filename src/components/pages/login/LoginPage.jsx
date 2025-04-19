import React, { useState } from 'react';
import styled from 'styled-components';
import Form from '../../../reusable-ui/Form.jsx';
import Logo from '../../../reusable-ui/Logo';
import FormInformation from '../../../reusable-ui/FormInformation.jsx';
import LoginForm from './LoginForm.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const onEmailChange = (e) => handleChange(e, setEmail);
  const onPasswordChange = (e) => handleChange(e, setPassword);

  return (
    <LoginPageStyled>
      <div className="form-wrapper">
        <Logo />
        <FormInformation title="Se connecter" text="Connectez-vous à votre compte" />
        <LoginForm
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          email={email}
          password={password}
        />
      </div>
    </LoginPageStyled>
  );
}

const LoginPageStyled = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;

  .form-wrapper {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 420px;
    text-align: center;
  }
`;
