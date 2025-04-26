const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./app/routers');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;

//* Setup
app.use(
  cors({
    origin: ['https://eco-trend-92622n2j4-sniopys-projects.vercel.app', 'http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API ecoTrend fonctionne 🚀');
});

app.use(router);

// Middleware pour routes non trouvées (debug)
app.use((req, res) => {
  res.status(404).send('Page introuvable');
});

app.listen(port, () => {
  console.log(`API ecoTrend en route`);
});
