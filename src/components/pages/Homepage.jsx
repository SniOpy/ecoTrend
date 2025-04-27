import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  background-color: #f9f5f0;
  font-family: 'Georgia', serif;
  color: #333;
`;

const Hero = styled.section`
  height: 100vh;
  background: url('/images/hero-eco.jpg') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroButton = styled(Link)`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: rgba(47, 133, 90, 0.9);
  color: white;
  border-radius: 50px;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    background-color: rgba(47, 133, 90, 1);
  }
`;

const Section = styled.section`
  padding: 6rem 2rem;
  text-align: center;
  background: ${(props) => props.bg || 'none'};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2f4f4f;
`;

const SectionText = styled.p`
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  width: 260px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const ProductTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  color: #2f855a;
`;

export default function Homepage() {
  return (
    <Container>
      {/* Hero Section */}
      <Hero>
        <HeroTitle>
          Changeons la Mode
          <br />
          pour Changer le Monde 🌍
        </HeroTitle>
        <HeroButton to="/products">Découvrir Nos Produits</HeroButton>
      </Hero>

      {/* Notre Vision */}
      <Section>
        <SectionTitle>Notre Vision</SectionTitle>
        <SectionText>
          Chez EcoTrend, chaque vêtement est conçu pour réduire notre impact environnemental,
          soutenir une consommation plus responsable, et offrir une qualité qui respecte autant la
          planète que votre style.
        </SectionText>
      </Section>

      {/* Nos Coups de Cœur */}
      <Section bg="#f0ebe3">
        <SectionTitle>Nos Coups de Cœur</SectionTitle>
        <ProductsGrid>
          <ProductCard>
            <ProductImage src="/images/products/jeans.png" alt="Jeans Bio" />
            <ProductInfo>
              <ProductTitle>Jeans</ProductTitle>
              <ProductPrice>59,99 €</ProductPrice>
            </ProductInfo>
          </ProductCard>

          <ProductCard>
            <ProductImage src="/images/products/tote.png" alt="Sac Lin" />
            <ProductInfo>
              <ProductTitle>Sac en Lin Naturel</ProductTitle>
              <ProductPrice>29,99 €</ProductPrice>
            </ProductInfo>
          </ProductCard>

          <ProductCard>
            <ProductImage src="/images/products/sweater.png" alt="Sweater Recyclée" />
            <ProductInfo>
              <ProductTitle>Sweater recyclée</ProductTitle>
              <ProductPrice>89,99 €</ProductPrice>
            </ProductInfo>
          </ProductCard>
        </ProductsGrid>
      </Section>
    </Container>
  );
}
