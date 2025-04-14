const express = require('express');
const app = express();
const router = require('./app/routers');
const port = 3000;

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
