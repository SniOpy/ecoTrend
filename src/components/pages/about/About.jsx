import styled from 'styled-components';

export default function About() {
  return (
    <PageWrapper>
      <Title>À propos d'EcoTrend</Title>

      <Section>
        <SectionTitle>Notre Démarche</SectionTitle>
        <SectionText>
          EcoTrend est né d'une conviction forte : la mode peut être belle, tendance et responsable
          à la fois. Nous souhaitons inspirer un changement en proposant des vêtements et
          accessoires qui respectent la planète et les personnes qui les fabriquent.
        </SectionText>
      </Section>

      <Section bg="#f7fafc">
        <SectionTitle>Qui sommes-nous ?</SectionTitle>
        <SectionText>
          Nous sommes une équipe de passionnés d'écologie, de mode et d'innovation. Chaque jour,
          nous nous engageons à sélectionner les meilleurs produits et à soutenir des initiatives
          durables, pour une consommation plus consciente et respectueuse.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>D'où proviennent nos produits ?</SectionTitle>
        <SectionText>
          Nos produits sont fabriqués à partir de matières naturelles, biologiques ou recyclées.
          Nous collaborons avec des artisans locaux et des partenaires certifiés, garantissant des
          processus de fabrication éthiques, transparents et éco-responsables.
        </SectionText>
      </Section>
    </PageWrapper>
  );
}

// Styled Components
const PageWrapper = styled.div`
  background-color: #f9f5f0;
  padding: 6rem 2rem;
  min-height: 100vh;
  font-family: 'Georgia', serif;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: #2f4f4f;
  margin-bottom: 5rem;
`;

const Section = styled.section`
  max-width: 900px;
  margin: 0 auto 5rem;
  padding: 3rem 2rem;
  background-color: ${(props) => props.bg || 'transparent'};
  border-radius: 12px;
  box-shadow: ${(props) => (props.bg ? '0 8px 20px rgba(0, 0, 0, 0.05)' : 'none')};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 2rem;
`;

const SectionText = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.8;
`;
