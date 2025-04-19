const theme = {
  colors: {
    primary: '#4CAF50',
    secondary: '#2E7D32',
    background: '#F5F5F5',
    text: '#212121',
    textSecondary: '#757575',
    white: '#FFFFFF',
    error: '#D32F2F',
  },

  typography: {
    fontTitle: `'Poppins', sans-serif`,
    fontBody: `'Open Sans', sans-serif`,
    sizes: {
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.5rem',
      body: '1rem',
      small: '0.875rem',
    },
    weights: {
      regular: 400,
      medium: 500,
      bold: 600,
    },
  },

  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '64px',
  },

  layout: {
    containerWidth: '1200px',
    containerPadding: '20px',
    borderRadius: '6px',
  },
};

export default theme = {
  colors,
  typography,
  weights,
  spacing,
  layout,
};
