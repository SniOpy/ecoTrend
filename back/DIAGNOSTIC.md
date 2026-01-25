# Guide de Diagnostic - Problèmes de connexion et produits

## Problème : Les produits ne s'affichent pas sur localhost:5173

### Étape 1 : Vérifier que le backend fonctionne

1. Assurez-vous que le serveur backend est démarré :
   ```bash
   cd back
   npm run dev
   ```

2. Vérifiez que le serveur répond :
   ```bash
   curl http://localhost:3000/
   ```
   Vous devriez voir : `API ecoTrend fonctionne 🚀`

3. Testez l'endpoint des produits :
   ```bash
   curl http://localhost:3000/products
   ```
   Vous devriez voir un tableau JSON avec vos produits.

### Étape 2 : Vérifier la connexion à la base de données

1. Vérifiez que votre fichier `back/.env` contient bien `DATABASE_URL` :
   ```env
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

2. Vérifiez les logs du backend. Vous devriez voir :
   - `✅ Connexion à la base de données établie` si la connexion réussit
   - `❌ Erreur de connexion à la base de données: ...` si elle échoue

### Étape 3 : Vérifier que la base de données contient des produits

#### Option A : Via psql (recommandé)

Si vous utilisez une base de données locale :
```bash
psql postgresql://user:password@localhost:5432/ecotrend -c 'SELECT COUNT(*) FROM "product";'
```

Si vous utilisez Render, utilisez l'External Database URL :
```bash
export RENDER_DATABASE_URL="postgresql://user:password@host:port/database"
psql "$RENDER_DATABASE_URL" -c 'SELECT COUNT(*) FROM "product";'
```

#### Option B : Via le script de diagnostic

```bash
cd back/script
export RENDER_DATABASE_URL="postgresql://user:password@host:port/database"
bash check_db.sh
```

### Étape 4 : Initialiser la base de données si nécessaire

Si la base de données est vide ou n'existe pas :

#### Pour une base de données locale :
```bash
cd back/script
psql postgresql://user:password@localhost:5432/ecotrend -f create_table.sql
psql postgresql://user:password@localhost:5432/ecotrend -f import_data.sql
```

#### Pour Render :
```bash
cd back/script
export RENDER_DATABASE_URL="postgresql://user:password@host:port/database"
bash init_render_db.sh
```

### Étape 5 : Vérifier la console du navigateur

1. Ouvrez les outils de développement (F12)
2. Allez dans l'onglet "Console"
3. Recherchez les messages :
   - `🔄 Tentative de récupération des produits depuis: http://localhost:3000/products`
   - `✅ Produits récupérés: [...]` (succès)
   - `❌ Erreur lors de la récupération des produits: ...` (erreur)

4. Allez dans l'onglet "Network"
5. Recherchez la requête vers `/products`
6. Vérifiez :
   - Le statut HTTP (200 = succès, 404/500 = erreur)
   - La réponse JSON

### Étape 6 : Vérifier CORS

Si vous voyez une erreur CORS dans la console :
- Vérifiez que `back/app.js` est configuré pour accepter les requêtes depuis `http://localhost:5173`
- Le backend doit avoir `cors` configuré correctement

### Problèmes courants

#### 1. "Network Error" ou "ERR_CONNECTION_REFUSED"
- **Cause** : Le backend n'est pas démarré ou n'écoute pas sur le port 3000
- **Solution** : Démarrez le backend avec `cd back && npm run dev`

#### 2. "404 Not Found" sur `/products`
- **Cause** : La route n'existe pas ou le backend n'est pas correctement configuré
- **Solution** : Vérifiez `back/app/routers/productRouter.js` et `back/app/routers/index.js`

#### 3. "500 Internal Server Error"
- **Cause** : Erreur dans le backend (souvent problème de connexion DB ou requête SQL)
- **Solution** : Vérifiez les logs du backend pour voir l'erreur exacte

#### 4. Tableau vide `[]` retourné
- **Cause** : La base de données ne contient pas de produits
- **Solution** : Initialisez la base de données avec les scripts SQL (voir Étape 4)

#### 5. "SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
- **Cause** : `DATABASE_URL` est mal formée ou le mot de passe est manquant
- **Solution** : Vérifiez votre fichier `.env` et utilisez le format correct

## À propos de .env.render

Le fichier `.env.render` n'est **pas nécessaire** pour le développement local. C'est juste un fichier d'exemple pour documenter les variables d'environnement utilisées sur Render.

Pour le développement local, utilisez uniquement `back/.env`.
