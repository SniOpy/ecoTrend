# Guide de Déploiement sur Render

## Déploiement Automatique avec render.yaml

Votre projet est déjà configuré avec un fichier `render.yaml` qui automatise la configuration. Voici comment déployer :

## Méthode 1 : Déploiement via Dashboard Render (Recommandé)

### Étape 1 : Connecter votre Repository GitHub

1. Allez sur [Render Dashboard](https://dashboard.render.com)
2. Cliquez sur **"New +"** > **"Blueprint"**
3. Connectez votre repository GitHub `SniOpy/ecoTrend`
4. Render détectera automatiquement le fichier `render.yaml`

### Étape 2 : Render Configure Automatiquement

Le fichier `render.yaml` configure automatiquement :

- ✅ Service web `ecotrend-backend`
- ✅ Base de données PostgreSQL `ecotrend-db`
- ✅ Variables d'environnement (DATABASE_URL, PORT, NODE_ENV)
- ✅ Commandes de build et de démarrage

### Étape 3 : Configurer SECRET_KEY

1. Une fois le service créé, allez dans **"Environment"**
2. Ajoutez la variable :
   - **Key**: `SECRET_KEY`
   - **Value**: Générez avec `openssl rand -base64 32`

### Étape 4 : Initialiser la Base de Données

1. Dans le dashboard Render, ouvrez votre base de données `ecotrend-db`
2. Cliquez sur **"Connect"** ou **"Info"**
3. Copiez l'**External Database URL**
4. Sur votre machine locale :

```bash
# Exporter l'URL de la base de données
export RENDER_DATABASE_URL="postgresql://user:password@host:port/database"

# Créer les tables
cd /home/bernardo/ecoTrend
psql "$RENDER_DATABASE_URL" -f back/script/create_table.sql

# Insérer les données
psql "$RENDER_DATABASE_URL" -f back/script/import_data.sql
```

### Étape 5 : Vérifier le Déploiement

1. Render déploie automatiquement après chaque push sur `master`
2. Vérifiez l'URL de votre service (ex: `https://ecotrend-backend.onrender.com`)
3. Testez :
   ```bash
   curl https://ecotrend-backend.onrender.com/
   ```
   Devrait retourner : `API ecoTrend fonctionne 🚀`

## Méthode 2 : Déploiement Manuel (Sans render.yaml)

Si vous préférez configurer manuellement :

### 1. Créer la Base de Données

1. Dashboard Render > **"New +"** > **"PostgreSQL"**
2. Configuration :
   - **Name**: `ecotrend-db`
   - **Database**: `ecotrend`
   - **User**: `ecotrend_user`
   - **Region**: `Frankfurt`
   - **Plan**: `Free`
3. Cliquez sur **"Create Database"**

### 2. Créer le Service Web

1. Dashboard Render > **"New +"** > **"Web Service"**
2. Connectez votre repository GitHub
3. Configuration :
   - **Name**: `ecotrend-backend`
   - **Region**: `Frankfurt`
   - **Branch**: `master`
   - **Root Directory**: _(laisser vide)_
   - **Environment**: `Node`
   - **Build Command**: `cd back && npm install`
   - **Start Command**: `cd back && npm start`
   - **Plan**: `Free`

### 3. Configurer les Variables d'Environnement

Dans l'onglet **"Environment"** du service web :

1. **DATABASE_URL** :
   - Cliquez sur **"Link Database"**
   - Sélectionnez `ecotrend-db`
   - Render configure automatiquement

2. **NODE_ENV** : `production`

3. **PORT** : _(configuré automatiquement par Render)_

4. **SECRET_KEY** : Générez avec `openssl rand -base64 32`

## Déploiement Automatique

Render déploie automatiquement :

- ✅ À chaque push sur la branche `master`
- ✅ Après chaque merge de pull request
- ✅ Vous pouvez aussi déclencher un déploiement manuel depuis le dashboard

## Commandes Utiles

### Voir les Logs

```bash
# Depuis le dashboard Render
# Onglet "Logs" de votre service
```

### Redémarrer le Service

```bash
# Depuis le dashboard Render
# Bouton "Manual Deploy" > "Clear build cache & deploy"
```

### Vérifier le Statut

```bash
curl https://ecotrend-backend.onrender.com/
curl https://ecotrend-backend.onrender.com/products
```

## Mise à Jour du Frontend

Après le déploiement sur Render, mettez à jour votre frontend Vercel :

1. **Variables d'environnement Vercel** :
   - `VITE_BACKEND_URL`: `https://ecotrend-backend.onrender.com`
   - `VITE_NODE_ENV`: `production`

2. **Redéployer sur Vercel** :
   ```bash
   npm run deploy:prod
   # ou
   npx vercel --prod
   ```

## Dépannage

### Le service ne démarre pas

1. Vérifiez les logs dans le dashboard Render
2. Vérifiez que `DATABASE_URL` est bien configurée
3. Vérifiez que `SECRET_KEY` est définie

### Erreur de connexion à la base de données

1. Vérifiez que la base de données est dans la même région
2. Vérifiez que `DATABASE_URL` utilise l'Internal Database URL (automatique si liée)
3. Vérifiez que les tables existent (exécutez les scripts SQL)

### Le build échoue

1. Vérifiez les logs de build
2. Vérifiez que toutes les dépendances sont dans `package.json`
3. Vérifiez que Node.js version est compatible

## Notes Importantes

- **Plan gratuit** : Le service entre en dormance après 15 minutes d'inactivité
- **Premier démarrage** : Peut prendre 30-60 secondes après dormance
- **Base de données** : Entre en dormance après 90 jours d'inactivité
- **Limites** : 750 heures/mois pour le plan gratuit

## Support

- [Documentation Render](https://render.com/docs)
- [Support Render](https://render.com/support)
