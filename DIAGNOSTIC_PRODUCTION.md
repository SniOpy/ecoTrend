# Diagnostic Production - Produits non affichés sur Vercel

## Checklist de Diagnostic

### ✅ Étape 1 : Vérifier les Variables d'Environnement Frontend (Vercel)

**Le problème vient probablement d'ici !**

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. **Settings** → **Environment Variables**

**Vérifiez que ces variables existent ET sont dans l'environnement "Production" :**

| Variable | Valeur | Environnements |
|----------|--------|----------------|
| `VITE_BACKEND_URL` | `https://ecotrend-4.onrender.com/` | ✅ **Production** (obligatoire) |
| `VITE_NODE_ENV` | `production` | ✅ **Production** uniquement |

⚠️ **CRITIQUE** : Si ces variables ne sont pas dans "Production", elles ne seront pas disponibles lors du build !

### ✅ Étape 2 : Vérifier l'URL Vercel Exacte

1. Allez sur Vercel Dashboard → **Deployments**
2. Cliquez sur votre dernier déploiement
3. Regardez l'URL en haut : `https://[VOTRE-URL].vercel.app`

**Vérifiez que cette URL correspond dans `back/app.js` :**

```javascript
origin: 'https://eco-trend-front.vercel.app'  // ← Votre URL doit être ici
```

Si votre URL est différente, mettez à jour `back/app.js` et redéployez sur Render.

### ✅ Étape 3 : Vérifier dans la Console du Navigateur

1. Ouvrez votre site Vercel en production
2. Ouvrez la console (F12)
3. Regardez les logs `📋 Configuration:`

**Si vous voyez :**
```javascript
{
  isProduction: false,  // ❌ PROBLÈME
  VITE_BACKEND_URL: undefined,  // ❌ PROBLÈME
  url: "http://localhost:3000/products"  // ❌ PROBLÈME
}
```

→ Les variables ne sont pas configurées sur Vercel

**Si vous voyez :**
```javascript
{
  isProduction: true,
  VITE_BACKEND_URL: "https://ecotrend-4.onrender.com/",
  url: "https://ecotrend-4.onrender.com/products"
}
```

Mais que les produits ne s'affichent toujours pas → Problème CORS ou erreur réseau

### ✅ Étape 4 : Vérifier les Erreurs CORS

Dans la console du navigateur, cherchez des erreurs comme :
```
Access to XMLHttpRequest at 'https://ecotrend-4.onrender.com/products' 
from origin 'https://votre-site.vercel.app' has been blocked by CORS policy
```

**Solution :**
1. Vérifiez que votre URL Vercel est dans `back/app.js`
2. Redéployez le backend sur Render

### ✅ Étape 5 : Vérifier l'Onglet Network

1. Ouvrez l'onglet **Network** (F12)
2. Rechargez la page
3. Cherchez la requête vers `/products`

**Si Status = 200** : L'API répond, le problème est dans le frontend
**Si Status = CORS error** : Problème de configuration CORS
**Si Status = 404/500** : Problème backend

## Solutions par Problème

### Problème 1 : Variables non configurées sur Vercel

**Symptôme** : `VITE_BACKEND_URL: undefined` dans la console

**Solution** :
1. Vercel Dashboard → Settings → Environment Variables
2. Ajoutez `VITE_BACKEND_URL` = `https://ecotrend-4.onrender.com/`
3. **Sélectionnez "Production"** dans les environnements
4. Redéployez : `npx vercel --prod`

### Problème 2 : CORS bloque les requêtes

**Symptôme** : Erreur CORS dans la console

**Solution** :
1. Trouvez votre URL Vercel exacte
2. Mettez à jour `back/app.js` ligne 15 avec votre URL
3. Redéployez sur Render

### Problème 3 : Variables dans le mauvais environnement

**Symptôme** : Variables configurées mais pas chargées

**Solution** :
- Vérifiez que les variables sont dans **"Production"** et pas seulement "Preview" ou "Development"
- Redéployez après avoir corrigé

## Commandes de Vérification

```bash
# Vérifier les variables Vercel (depuis le projet)
npx vercel env ls

# Tester l'API directement
curl https://ecotrend-4.onrender.com/products

# Tester avec CORS
curl -H "Origin: https://votre-site.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://ecotrend-4.onrender.com/products
```

## Note Importante sur le .env Backend

Le fichier `back/.env` que vous avez montré est **pour le développement local uniquement**. 

En production sur Render :
- Les variables sont configurées via `render.yaml` ou le dashboard Render
- `DATABASE_URL` est automatiquement configurée par Render
- `NODE_ENV=production` est défini automatiquement

**Le problème ne vient PAS du `.env` backend**, mais plutôt :
1. ❌ Variables frontend non configurées sur Vercel
2. ❌ CORS mal configuré (URL Vercel différente)
3. ❌ Variables dans le mauvais environnement sur Vercel
