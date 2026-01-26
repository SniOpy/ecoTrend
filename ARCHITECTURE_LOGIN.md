# Architecture Modulaire - Système de Connexion avec JWT

## Vue d'ensemble

Le système de connexion a été conçu avec une approche modulaire similaire à l'inscription, avec une gestion sécurisée du JWT via des cookies httpOnly.

## Structure Modulaire

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx        # Protection des routes (vérifie JWT)
│   └── pages/
│       ├── login/
│       │   ├── LoginPage.jsx         # Page wrapper (présentation)
│       │   └── LoginForm.jsx          # Formulaire de connexion (logique UI)
│       └── account/
│           └── AccountPage.jsx       # Page protégée (améliorée)
├── hooks/
│   └── useLogin.jsx                   # Hook personnalisé (logique métier)
├── utils/
│   ├── validation.js                 # Fonctions de validation (réutilisées)
│   └── notify.js                      # Système de notifications
└── context/
    └── UserContext.jsx                # Contexte utilisateur

back/
├── app/
│   ├── controllers/
│   │   └── userController.js          # Contrôleur login amélioré
│   ├── services/
│   │   └── tokenController.js        # Gestion JWT
│   └── routers/
│       └── userRouter.js              # Routes
```

## Composants et Responsabilités

### 1. Frontend

#### `LoginPage.jsx` (Page)
- **Responsabilité** : Structure et présentation de la page
- **Rôle** : Wrapper qui affiche le logo, les informations et le formulaire

#### `LoginForm.jsx` (Composant Formulaire)
- **Responsabilité** : Gestion de l'interface utilisateur du formulaire
- **Fonctionnalités** :
  - Gestion de l'état local des champs (email, password)
  - Validation en temps réel (onBlur)
  - Affichage des erreurs par champ
  - Désactivation pendant le chargement
- **Dépendances** : `useLogin`, `validation`

#### `useLogin.jsx` (Hook Personnalisé)
- **Responsabilité** : Logique métier de la connexion
- **Fonctionnalités** :
  - Validation des données avant envoi
  - Appel API avec gestion d'erreurs
  - Gestion de l'état de chargement
  - Gestion des erreurs par champ
  - Stockage des données utilisateur (UserContext + localStorage)
  - Redirection vers `/account` après succès
- **Gestion JWT** :
  - Le JWT est stocké dans un cookie httpOnly (sécurisé)
  - Les données utilisateur sont stockées dans le contexte et localStorage
  - Le token est aussi stocké dans localStorage pour référence (optionnel)

#### `ProtectedRoute.jsx` (Composant de Protection)
- **Responsabilité** : Protection des routes nécessitant une authentification
- **Fonctionnalités** :
  - Vérifie l'authentification via l'API `/account` (vérifie le JWT dans le cookie)
  - Charge les données utilisateur depuis localStorage si disponibles
  - Redirige vers `/login` si non authentifié
  - Affiche un loader pendant la vérification

#### `AccountPage.jsx` (Page Protégée)
- **Responsabilité** : Affichage et gestion du compte utilisateur
- **Améliorations** :
  - URL API dynamique (dev/prod)
  - Gestion d'erreur améliorée (redirection si 401)
  - Logout amélioré avec nettoyage complet

### 2. Backend

#### `userController.js` (Contrôleur)
- **Responsabilité** : Logique métier backend
- **Améliorations** :
  - Validation complète des données
  - Réponses structurées (JSON avec success/errors)
  - Gestion d'erreurs appropriée
  - Codes HTTP corrects (400, 401, 500, 200)
  - Cookie JWT sécurisé (httpOnly, secure en production)

#### `tokenController.js` (Service JWT)
- **Responsabilité** : Création et vérification des tokens JWT
- **Fonctionnalités** :
  - Création de token avec payload (id, role)
  - Vérification de token (middleware `checkTokenMember`)
  - Suppression de cookie (logout)

## Flux de Connexion

```
1. Utilisateur remplit le formulaire (email, password)
   ↓
2. LoginForm gère les changements (handleChange)
   ↓
3. Validation en temps réel (handleBlur) - optionnel
   ↓
4. Soumission du formulaire (handleSubmit)
   ↓
5. useLogin valide les données (validateEmail, validatePassword)
   ↓
6. Si valide → Appel API POST /login
   ↓
7. Backend vérifie email/password
   ↓
8. Backend crée le JWT et le stocke dans un cookie httpOnly
   ↓
9. Backend retourne les données utilisateur + token
   ↓
10. useLogin stocke les données dans UserContext + localStorage
   ↓
11. Notification succès + Redirection vers /account
   ↓
12. ProtectedRoute vérifie l'authentification via /account
   ↓
13. AccountPage affiche les données utilisateur
```

## Sécurité JWT

### Stockage du Token

1. **Cookie httpOnly** (Principal) :
   - Stocké automatiquement par le navigateur
   - Non accessible via JavaScript (protection XSS)
   - Envoyé automatiquement avec chaque requête
   - Configuré avec `secure: true` en production (HTTPS uniquement)
   - `sameSite: 'none'` en production pour CORS

2. **localStorage** (Optionnel) :
   - Stocke les données utilisateur (sans mot de passe)
   - Stocke le token pour référence (peut être supprimé pour plus de sécurité)
   - Utilisé pour l'affichage immédiat avant vérification backend

### Vérification de l'Authentification

Le middleware `checkTokenMember` dans `tokenController.js` :
1. Récupère le token depuis le cookie `access_token`
2. Vérifie la signature avec `SECRET_KEY`
3. Ajoute les données décodées à `req.user`
4. Passe au middleware suivant si valide

## Utilisation

### Dans LoginForm.jsx

```jsx
const { login, loading, errors, setErrors } = useLogin();

// Utilisation simple
const handleSubmit = (e) => {
  e.preventDefault();
  login(formData);
};
```

### Protection d'une Route

```jsx
<Route 
  path="/account" 
  element={
    <ProtectedRoute>
      <AccountPage />
    </ProtectedRoute>
  } 
/>
```

### Vérification de l'Authentification

```jsx
const { userData } = useUser();

if (userData) {
  // Utilisateur connecté
}
```

## Avantages de l'Approche Modulaire

1. **Sécurité** : JWT dans cookie httpOnly (protection XSS)
2. **Modulaire** : Chaque partie a une responsabilité claire
3. **Réutilisable** : `useLogin` peut être utilisé ailleurs
4. **Testable** : Modules testables indépendamment
5. **Maintenable** : Code organisé et facile à modifier
6. **Évolutif** : Facile d'ajouter des fonctionnalités (remember me, etc.)

## Prochaines Améliorations Possibles

1. **Remember Me** : Option pour prolonger la session
2. **Refresh Token** : Système de rafraîchissement de token
3. **Token Expiration Handling** : Gestion automatique de l'expiration
4. **Multi-device** : Gestion des sessions multiples
5. **2FA** : Authentification à deux facteurs
6. **Password Reset** : Réinitialisation de mot de passe
