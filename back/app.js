const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const router = require('./app/routers');

const port = process.env.PORT || 3000;

//* CORS Configuration - Correction
app.use(
  cors({
    origin: [
      'https://eco-trend-front-jjtz1cb0m-sniopys-projects.vercel.app/', // ton frontend Vercel
      'http://localhost:5173', // pour ton développement local
    ],
    credentials: true,
  })
);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//* Test route - API health check
app.get('/', (req, res) => {
  res.send('API ecoTrend fonctionne 🚀');
});

//* Routes principales
app.use(router);

//* 404 Handler
app.use((req, res) => {
  res.status(404).send('Page introuvable');
});

//* Lancement du serveur
app.listen(port, () => {
  console.log(`API ecoTrend en route sur le port ${port}`);
});
