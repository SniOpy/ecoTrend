const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./app/routers');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 3000 || process.env.PORT;

//* Setup
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(router);

// Middleware pour routes non trouvées (debug)
app.use((req, res) => {
  res.status(404).send('Page introuvable');
});

app.listen(port, () => {
  console.log(`API ecoTrend en route`);
});
