const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./app/routers');
const port = 3000 || process.env.PORT;

//* Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

// Middleware pour routes non trouvées (debug)
app.use((req, res) => {
  res.status(404).send('Page introuvable');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
