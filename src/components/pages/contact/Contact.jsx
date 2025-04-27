import styled from 'styled-components';

export default function Contact() {
  return (
    <PageWrapper>
      <Title>Entrons en Contact</Title>
      <Subtitle>Nous serions ravis de vous aider 🌿</Subtitle>

      <FormWrapper>
        <Form>
          <Input type="text" placeholder="Votre nom" required />
          <Input type="email" placeholder="Votre email" required />
          <Textarea placeholder="Votre message" required />
          <Button type="submit">Envoyer</Button>
        </Form>

        <ContactInfo>
          <h3>Nos Coordonnées</h3>
          <p>Email : contact@ecotrend.com (no-reply)</p>
          <p>Téléphone : +33 6 XX XX XX XX</p>
          <p>Adresse : 123 rue de la Nature, Paris, France</p>
        </ContactInfo>
      </FormWrapper>
    </PageWrapper>
  );
}

// Styles
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
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.3rem;
  color: #718096;
  margin-bottom: 4rem;
`;

const FormWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f7fafc;

  &:focus {
    outline: none;
    border-color: #38a169;
  }
`;

const Textarea = styled.textarea`
  padding: 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f7fafc;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #38a169;
  }
`;

const Button = styled.button`
  background-color: #2f855a;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    background-color: #276749;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  text-align: left;
  padding-left: 2rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #2f4f4f;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #4a5568;
  }
`;
