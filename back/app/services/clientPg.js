const { Pool } = require('pg');
require('dotenv').config();

// Fonction pour construire la chaîne de connexion à partir des variables individuelles
function buildConnectionString() {
  const user = process.env.PORTPG_USER;
  const password = process.env.PG_PASSWORD;
  const host = process.env.PG_HOSTSERVER;
  const database = process.env.PG_DATABASE;
  const port = process.env.PG_DBPORT || '5432';

  // Vérifier que toutes les variables requises sont présentes
  if (!user || !password || !host || !database) {
    const missing = [];
    if (!user) missing.push('PORTPG_USER');
    if (!password) missing.push('PG_PASSWORD');
    if (!host) missing.push('PG_HOSTSERVER');
    if (!database) missing.push('PG_DATABASE');

    throw new Error(
      `Variables d'environnement manquantes pour la connexion à la base de données: ${missing.join(', ')}. ` +
      `Veuillez définir DATABASE_URL ou toutes les variables individuelles (PORTPG_USER, PG_PASSWORD, PG_HOSTSERVER, PG_DATABASE, PG_DBPORT).`
    );
  }

  // Encoder le mot de passe pour éviter les problèmes avec les caractères spéciaux
  const encodedPassword = encodeURIComponent(password);

  return `postgresql://${user}:${encodedPassword}@${host}:${port}/${database}`;
}

// Déterminer la chaîne de connexion à utiliser
let connectionString;

if (process.env.DATABASE_URL) {
  // Option A: Utiliser DATABASE_URL si elle est définie
  connectionString = process.env.DATABASE_URL;
} else {
  // Option B: Construire à partir des variables individuelles
  try {
    connectionString = buildConnectionString();
  } catch (error) {
    console.error('❌ Erreur de configuration de la base de données:', error.message);
    process.exit(1);
  }
}

// Vérifier que la chaîne de connexion n'est pas vide
if (!connectionString || connectionString.trim() === '') {
  console.error(
    '❌ Erreur: Aucune configuration de base de données trouvée. ' +
    'Veuillez définir DATABASE_URL ou toutes les variables individuelles (PORTPG_USER, PG_PASSWORD, PG_HOSTSERVER, PG_DATABASE, PG_DBPORT).'
  );
  process.exit(1);
}

const client = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => console.log('✅ Connexion à la base de données établie'))
  .catch((err) => {
    console.error('❌ Erreur de connexion à la base de données:', err.message);
    // Ne pas faire planter l'application, mais logger l'erreur
  });

module.exports = client;
