import styled from 'styled-components';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: '5 astuces pour une garde-robe éco-responsable',
      category: 'Conseils',
      date: '26 avril 2025',
      author: 'Clara Dupont',
      image: '/images/blog/blog-eco1.png',
    },
    {
      id: 2,
      title: 'Comment choisir des matériaux durables ?',
      category: 'Éducation',
      date: '20 avril 2025',
      author: 'Thomas Martin',
      image: '/images/blog/blog-eco2.png',
    },
    {
      id: 3,
      title: "L'avenir de la mode circulaire",
      category: 'Tendances',
      date: '15 avril 2025',
      author: 'Sophie Bernard',
      image: '/images/blog/blog-eco3.png',
    },
  ];

  return (
    <PageWrapper>
      <Title>Notre Blog</Title>
      <Grid>
        {posts.map((post) => (
          <Card key={post.id}>
            <Image src={post.image} alt={post.title} />
            <CardContent>
              <Category>{post.category}</Category>
              <CardTitle>{post.title}</CardTitle>
              <Meta>
                {post.date} — {post.author}
              </Meta>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </PageWrapper>
  );
}

// Styles
const PageWrapper = styled.div`
  background-color: #f9f5f0;
  padding: 6rem 2rem;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-family: 'Georgia', serif;
  text-align: center;
  font-size: 3rem;
  color: #2f4f4f;
  margin-bottom: 5rem;
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Category = styled.p`
  font-size: 0.85rem;
  color: #38a169;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.75rem;
  font-weight: bold;
`;

const CardTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: #2d3748;
  line-height: 1.3;
`;

const Meta = styled.p`
  margin-top: auto;
  font-size: 0.85rem;
  color: #718096;
  margin-top: 2rem;
`;
