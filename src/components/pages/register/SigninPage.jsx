import React from 'react';
import styled from 'styled-components';
import Logo from '../../../reusable-ui/Logo';
import FormInformation from '../../../reusable-ui/FormInformation';
import SigninForm from './SigninForm.jsx';

export default function SigninPage() {
  return (
    <SigninPageStyled>
      <div className="form-wrapper">
        <Logo />
        <FormInformation title="S'enregistrer" text="Créer un compte pour shopper !" />
        <SigninForm />
      </div>
    </SigninPageStyled>
  );
}

const SigninPageStyled = styled.div`
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

  .form-register {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
`;
