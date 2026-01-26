const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const router = require('./app/routers');

const port = process.env.PORT || 3000;

// CORS Configuration
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [
        'https://eco-trend-front.vercel.app',
        'https://ecotrend.vercel.app',
        'https://ecotrend-frontend.vercel.app',
        'https://eco-trend-front-m24kl5eti-sniopys-projects.vercel.app',
        // Ajoutez ici votre URL Vercel exacte (SANS slash final)
        ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL.replace(/\/$/, '')] : []),
      ]
    : ['http://localhost:5173'];

app.use(
  cors({
    origin: function (origin, callback) {
      // Autoriser les requêtes sans origine (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Normaliser l'origine (enlever le slash final si présent)
      const normalizedOrigin = origin.replace(/\/$/, '');
      
      // Logger pour le debug
      console.log(`🔍 CORS Check - Origin reçue: ${origin}`);
      console.log(`🔍 CORS Check - Origin normalisée: ${normalizedOrigin}`);
      console.log(`🔍 CORS Check - Origines autorisées:`, allowedOrigins);

      if (
        allowedOrigins.indexOf(normalizedOrigin) !== -1 ||
        allowedOrigins.some((allowed) => normalizedOrigin === allowed.replace(/\/$/, '')) ||
        process.env.NODE_ENV !== 'production'
      ) {
        console.log(`✅ CORS: Origine autorisée: ${normalizedOrigin}`);
        callback(null, true);
      } else {
        console.warn(`❌ CORS: Origine non autorisée: ${normalizedOrigin}`);
        console.warn(`   Origines autorisées:`, allowedOrigins);
        // En développement, autoriser quand même pour faciliter le debug
        if (process.env.NODE_ENV !== 'production') {
          callback(null, true);
        } else {
          callback(new Error(`Not allowed by CORS. Origin: ${normalizedOrigin}`));
        }
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Test route - API health check
app.get('/', (req, res) => {
  res.send('API ecoTrend fonctionne 🚀');
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
