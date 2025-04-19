import React from 'react';
import styled from 'styled-components';

export default function FormInformation({ title, text }) {
  return (
    <FormInformationStyled>
      <h2>{title}</h2>
      <p>{text}</p>
    </FormInformationStyled>
  );
}

const FormInformationStyled = styled.div`
  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    color: #212121;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.95rem;
    color: #757575;
    margin-bottom: 24px;
  }
`;
