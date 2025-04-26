const { Pool } = require('pg');
require('dotenv').config();

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => console.log('connexion établie'))
  .catch((err) => console.error('Erreur de connexion : ', err));

module.exports = client;
