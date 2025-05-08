const { Pool } = require('pg');
require('dotenv').config();

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  statement_timeout: 5000, // 
});

client
  .connect()
  .then(() => {
    console.log('🟢 Connexion établie à PostgreSQL');
    // On force le search_path
    client.query('SET search_path TO public');
  })
  .catch((err) => console.error('🔴 Erreur de connexion : ', err.message));

module.exports = client;
