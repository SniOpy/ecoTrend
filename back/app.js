const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const router = require('./app/routers');

const port = process.env.PORT || 3000;

// CORS Configuration
if (process.env.NODE_ENV === 'production') {
  app.use(
    cors({
      origin: 'https://eco-trend-front.vercel.app',
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );
}
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Test route - API health check
app.get('/', (req, res) => {
  res.send('API ecoTrend fonctionne 🚀');
});

// Test route - Database connection check
app.get('/test-db', async (req, res) => {
  try {
    const client = require('./app/services/clientPg');
    const result = await client.query('SELECT COUNT(*) as count FROM "product";');
    res.json({
      success: true,
      databaseConnected: true,
      productCount: parseInt(result.rows[0].count),
      databaseUrl: process.env.DATABASE_URL ? 'Configurée' : 'Non configurée'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      databaseConnected: false,
      error: error.message,
      databaseUrl: process.env.DATABASE_URL ? 'Configurée' : 'Non configurée'
    });
  }
});

//Routes principales
app.use(router);

// 404 Handler
app.use((req, res) => {
  res.status(404).send('Page introuvable');
});

// Launch server
app.listen(port, () => {
  console.log(`API ecoTrend en route sur le port ${port}`);
});
