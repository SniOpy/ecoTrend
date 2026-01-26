# Configuration des Variables d'Environnement sur Vercel

## Problème

Si les produits ne s'affichent pas en production sur Vercel alors que l'API fonctionne, c'est probablement parce que les variables d'environnement ne sont pas configurées sur Vercel.

## Solution : Configurer les Variables d'Environnement

### Étape 1 : Accéder aux Paramètres du Projet

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `ecoTrend` (ou le nom de votre projet)
3. Cliquez sur **"Settings"** dans le menu
4. Cliquez sur **"Environment Variables"** dans le menu de gauche

### Étape 2 : Ajouter les Variables

Ajoutez les deux variables suivantes :

#### Variable 1 : VITE_BACKEND_URL

- **Key**: `VITE_BACKEND_URL`
- **Value**: `https://ecotrend-4.onrender.com/`
- **Environments**: Sélectionnez **Production**, **Preview**, et **Development**

⚠️ **Important** : Incluez le slash final `/` dans l'URL

#### Variable 2 : VITE_NODE_ENV

- **Key**: `VITE_NODE_ENV`
- **Value**: `production`
- **Environments**: Sélectionnez **Production** uniquement

⚠️ **Note** : Pour Preview et Development, vous pouvez laisser cette variable vide ou mettre `development`

### Étape 3 : Redéployer

Après avoir ajouté les variables :

1. Allez dans l'onglet **"Deployments"**
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Sélectionnez **"Redeploy"**
4. Ou faites un nouveau push sur votre branche principale

## Vérification

### 1. Vérifier dans les Logs de Build

Après le redéploiement, vérifiez les logs de build. Vous devriez voir que les variables sont bien chargées.

### 2. Vérifier dans la Console du Navigateur

1. Ouvrez votre site Vercel en production
2. Ouvrez les outils de développement (F12)
3. Allez dans l'onglet **"Console"**
4. Vous devriez voir les logs :
   ```
   🔄 Tentative de récupération des produits
   📋 Configuration: {
     isProduction: true,
     VITE_NODE_ENV: "production",
     VITE_BACKEND_URL: "https://ecotrend-4.onrender.com/",
     url: "https://ecotrend-4.onrender.com/products"
   }
   ```

### 3. Vérifier dans l'Onglet Network

1. Ouvrez l'onglet **"Network"** des outils de développement
2. Rechargez la page
3. Recherchez la requête vers `/products`
4. Vérifiez :
   - **Status**: Devrait être `200` (succès)
   - **URL**: Devrait être `https://ecotrend-4.onrender.com/products`
   - **Response**: Devrait contenir un tableau JSON avec les produits

## Problèmes Courants

### Les produits ne s'affichent toujours pas

1. **Vérifiez CORS** : Assurez-vous que l'URL de votre frontend Vercel correspond exactement à celle configurée dans `back/app.js` :
   ```javascript
   origin: 'https://eco-trend-front.vercel.app'
   ```
   Si votre URL Vercel est différente, mettez à jour `back/app.js` et redéployez sur Render.

2. **Vérifiez les logs** : Regardez la console du navigateur pour voir les erreurs exactes

3. **Vérifiez que l'API répond** : Testez directement :
   ```bash
   curl https://ecotrend-4.onrender.com/products
   ```

### Erreur CORS

Si vous voyez une erreur CORS dans la console :

1. Vérifiez que l'URL du frontend Vercel correspond exactement dans `back/app.js`
2. Vérifiez que `credentials: true` est bien configuré
3. Redéployez le backend sur Render après modification

### Variables non chargées

Si les variables ne sont pas chargées :

1. Vérifiez que vous avez bien sélectionné **Production** dans les environnements
2. Vérifiez que vous avez bien redéployé après avoir ajouté les variables
3. Les variables `VITE_*` doivent être préfixées avec `VITE_` pour être accessibles dans le code frontend

## Variables d'Environnement Complètes

Pour référence, voici toutes les variables nécessaires :

| Variable | Valeur Production | Environnements |
|----------|-------------------|----------------|
| `VITE_BACKEND_URL` | `https://ecotrend-4.onrender.com/` | Production, Preview, Development |
| `VITE_NODE_ENV` | `production` | Production uniquement |

## Note Importante

- Les variables `VITE_*` sont accessibles via `import.meta.env.VITE_*`
- Les variables sans préfixe `VITE_` ne sont **pas** accessibles dans le code frontend (sécurité)
- Après modification des variables, un redéploiement est nécessaire
