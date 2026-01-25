# ECO TREND

Application e-commerce éco-responsable avec backend Node.js/Express et frontend React.

## Architecture

- **Frontend**: React + Vite, déployé sur Vercel
- **Backend**: Node.js + Express, déployé sur Render
- **Base de données**: PostgreSQL sur Render (plan gratuit)

## Déploiement sur Render

### Prérequis

- Un compte [Render](https://render.com) (gratuit)
- Un repository GitHub avec le code du projet

### Étape 1: Créer la base de données PostgreSQL

1. Connectez-vous à votre dashboard Render
2. Cliquez sur "New +" > "PostgreSQL"
3. Configurez la base de données :
   - **Name**: `ecotrend-db`
   - **Database**: `ecotrend`
   - **User**: `ecotrend_user`
   - **Region**: `Frankfurt` (ou votre région préférée)
   - **Plan**: `Free`
4. Cliquez sur "Create Database"

### Étape 2: Créer le service Web

1. Dans le dashboard Render, cliquez sur "New +" > "Web Service"
2. Connectez votre repository GitHub
3. Configurez le service :
   - **Name**: `ecotrend-backend`
   - **Region**: `Frankfurt` (même région que la base de données)
   - **Branch**: `master` (ou votre branche principale)
   - **Root Directory**: Laisser vide (le fichier `render.yaml` gère la configuration)
   - **Environment**: `Node`
   - **Build Command**: `cd back && npm install`
   - **Start Command**: `cd back && npm start`
   - **Plan**: `Free`

4. Render détectera automatiquement le fichier `render.yaml` et configurera :
   - La connexion à la base de données
   - Les variables d'environnement de base
   - Le port et NODE_ENV

### Étape 3: Configurer les variables d'environnement

1. Dans votre service web, allez dans l'onglet "Environment"
2. Ajoutez la variable suivante :
   - **Key**: `SECRET_KEY`
   - **Value**: Générez une clé sécurisée avec `openssl rand -base64 32`

### Étape 4: Initialiser la base de données

Vous devez créer les tables et insérer les données initiales. Vous avez deux options :

#### Option A: Via le dashboard Render (recommandé)

1. Dans le dashboard Render, allez dans votre base de données `ecotrend-db`
2. Cliquez sur l'onglet "Connect" ou "Info"
3. **IMPORTANT** : Copiez l'**External Database URL** (pas l'Internal !)
   - L'Internal Database URL est uniquement pour les services Render
   - L'External Database URL est pour les connexions depuis votre machine locale
   - Format: `postgresql://user:password@host:port/database`
4. Sur votre machine locale, installez les outils PostgreSQL si nécessaire :
   ```bash
   # Linux/WSL
   sudo apt-get install postgresql-client
   
   # macOS
   brew install postgresql
   ```
5. Exécutez les scripts SQL dans l'ordre :
   ```bash
   # Remplacez par votre External Database URL
   export RENDER_DATABASE_URL="postgresql://user:password@host:port/database"
   
   # Créer les tables
   psql "$RENDER_DATABASE_URL" -f back/script/create_table.sql
   
   # Insérer les données initiales
   psql "$RENDER_DATABASE_URL" -f back/script/import_data.sql
   ```

#### Option B: Via un client PostgreSQL (pgAdmin, DBeaver, etc.)

1. Dans le dashboard Render, récupérez l'**External Database URL** depuis l'onglet "Connect"
2. Connectez-vous à votre base de données en utilisant cette URL
3. Exécutez le contenu de `back/script/create_table.sql`
4. Puis exécutez le contenu de `back/script/import_data.sql`

### Étape 5: Déployer et tester

1. Render déploiera automatiquement votre service après la configuration
2. Une fois déployé, notez l'URL de votre service (format: `https://ecotrend-backend.onrender.com`)
3. Testez l'API :
   ```bash
   curl https://votre-service.onrender.com/
   ```
   Vous devriez voir : `API ecoTrend fonctionne 🚀`

4. **Mettre à jour le frontend** :
   - Mettez à jour l'URL de l'API dans votre frontend Vercel (remplacez l'ancienne URL Railway par la nouvelle URL Render)
   - Configurez les variables d'environnement Vercel si nécessaire

## Développement local

### Backend

```bash
cd back
npm install
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

### Frontend

```bash
npm install
npm run dev
```

Le frontend démarre sur `http://localhost:5173`

### Variables d'environnement locales

Créez un fichier `back/.env` avec :

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/ecotrend
SECRET_KEY=votre_clé_secrète
NODE_ENV=development
```

## Structure du projet

```
ecoTrend/
├── back/                 # Backend Node.js/Express
│   ├── app/
│   │   ├── controllers/ # Contrôleurs
│   │   ├── datamapper/  # Accès aux données
│   │   ├── routers/     # Routes
│   │   └── services/    # Services (DB, JWT)
│   ├── script/          # Scripts SQL et migration
│   └── package.json
├── src/                 # Frontend React
│   ├── components/      # Composants React
│   ├── context/         # Contextes React
│   └── ...
├── render.yaml          # Configuration Render
└── package.json
```

## Notes importantes

- **Plan gratuit Render** : La base de données PostgreSQL gratuite entre en dormance après 90 jours d'inactivité. Le premier accès après dormance peut prendre quelques secondes.
- **CORS** : Le backend est configuré pour accepter les requêtes depuis le frontend Vercel en production.
- **Variables d'environnement** : La plupart sont configurées automatiquement via `render.yaml`. Seule `SECRET_KEY` doit être ajoutée manuellement.

## Support

Pour toute question ou problème avec le déploiement, consultez la [documentation Render](https://render.com/docs).
