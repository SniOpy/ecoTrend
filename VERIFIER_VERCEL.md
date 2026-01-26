# Guide de Vérification et Correction - Produits non affichés sur Vercel

## Diagnostic Rapide

### Étape 1 : Vérifier les Variables d'Environnement sur Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. **Settings** → **Environment Variables**

Vérifiez que ces variables existent :

| Variable | Valeur | Environnements |
|----------|--------|----------------|
| `VITE_BACKEND_URL` | `https://ecotrend-4.onrender.com/` | ✅ Production, Preview, Development |
| `VITE_NODE_ENV` | `production` | ✅ Production uniquement |

### Étape 2 : Vérifier dans la Console du Navigateur

1. Ouvrez votre site Vercel en production
2. Ouvrez la console (F12)
3. Regardez les logs qui commencent par `📋 Configuration:`

**Si vous voyez :**
```javascript
{
  isProduction: false,  // ❌ PROBLÈME
  VITE_BACKEND_URL: undefined,  // ❌ PROBLÈME
  url: "http://localhost:3000/products"  // ❌ PROBLÈME
}
```

**Cela signifie que :**
- Les variables d'environnement ne sont pas configurées sur Vercel
- OU elles n'ont pas été chargées au moment du build

**Solution :**
1. Ajoutez les variables sur Vercel (voir ci-dessus)
2. **Redéployez** après avoir ajouté les variables

### Étape 3 : Vérifier les Logs de Build Vercel

1. Allez sur Vercel Dashboard → **Deployments**
2. Cliquez sur le dernier déploiement
3. Regardez les **Build Logs**

Vous devriez voir que les variables sont chargées. Si vous voyez des warnings sur les variables manquantes, c'est là le problème.

## Solutions

### Solution 1 : Configurer les Variables (Recommandé)

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. Ajoutez :
   - `VITE_BACKEND_URL` = `https://ecotrend-4.onrender.com/`
   - `VITE_NODE_ENV` = `production` (Production uniquement)
3. **Redéployez** :
   - Option A : Faites un nouveau push
   - Option B : **Deployments** → **⋯** → **Redeploy**

### Solution 2 : Utiliser le Fallback (Temporaire)

Le code a été modifié pour utiliser un fallback si `VITE_BACKEND_URL` n'est pas défini. Mais c'est mieux de configurer les variables correctement.

### Solution 3 : Vérifier CORS

Si les produits ne s'affichent toujours pas après avoir configuré les variables :

1. Vérifiez l'URL exacte de votre frontend Vercel
2. Vérifiez que cette URL correspond dans `back/app.js` :
   ```javascript
   origin: 'https://votre-url-vercel.vercel.app'
   ```
3. Redéployez le backend sur Render après modification

## Commandes Utiles

### Vérifier les Variables Locales

```bash
# Vérifier que les variables sont bien dans .env
cat .env
```

### Tester l'API Directement

```bash
# Tester que l'API fonctionne
curl https://ecotrend-4.onrender.com/products
```

### Déployer sur Vercel avec Variables

```bash
# Déployer en production
npx vercel --prod

# Vérifier les variables avant déploiement
npx vercel env ls
```

## Notes Importantes

1. **Variables VITE_*** : Les variables doivent commencer par `VITE_` pour être accessibles dans le code frontend
2. **Build Time** : Les variables sont intégrées au moment du BUILD, pas au runtime
3. **Redéploiement** : Après avoir ajouté/modifié des variables, un redéploiement est nécessaire
4. **Environnements** : Assurez-vous de sélectionner **Production** pour les variables de production

## Debugging

Si le problème persiste, ouvrez la console du navigateur et partagez :
- Les logs `📋 Configuration:`
- Les erreurs dans l'onglet **Network**
- Les erreurs dans l'onglet **Console**
