import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterStyled>
      <FooterContent>
        <FooterBrand>EcoTrend</FooterBrand>
        <FooterLinks>
          <StyledLink to="/products">Catalogue</StyledLink>
          <StyledLink to="/about">À propos</StyledLink>
          <StyledLink to="/contact">Contact</StyledLink>
        </FooterLinks>
      </FooterContent>
      <FooterBottom>© {new Date().getFullYear()} EcoTrend. Tous droits réservés.</FooterBottom>
    </FooterStyled>
  );
}

const FooterStyled = styled.footer`
  background-color: #f7f5ef;
  padding: 2rem 1rem;
  font-family: 'Georgia', serif;
  color: #6b705c;
  font-size: 0.9rem;
  border-top: 1px solid #e2e8f0;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const FooterBrand = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #2f4f4f;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6b705c;
  font-weight: 500;

  &:hover {
    color: #2f855a;
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: #a0aec0;
`;
