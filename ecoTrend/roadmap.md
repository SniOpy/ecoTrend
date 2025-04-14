🔐 AUTHENTIFICATION
🔧 Back-End

    [BE] Créer le modèle User (id, name, email, password, role)

    [BE] Route POST /api/auth/register (inscription + hash du password)

    [BE] Route POST /api/auth/login (vérification email/password + JWT)

    [BE] Middleware d'authentification par token JWT

    [BE] Middleware pour autorisation admin

🎨 Front-End

    [FE] Formulaire d'inscription (nom, email, mot de passe)

    [FE] Formulaire de connexion

    [FE] Stockage du token JWT (localStorage ou cookies)

    [FE] Redirection vers le dashboard après login

    [FE] Gestion des erreurs d'authentification

🛍️ PRODUITS
🔧 Back-End

    [BE] Créer le modèle Product (name, price, stock, image, description, category_id)

    [BE] Route GET /api/products (liste publique)

    [BE] Route GET /api/products/:id (détail)

    [BE] Route POST /api/products (admin seulement)

    [BE] Route PUT /api/products/:id

    [BE] Route DELETE /api/products/:id

    [BE] Créer le modèle Category et route GET /api/categories

🎨 Front-End

    [FE] Page d’accueil avec les produits

    [FE] Carte produit responsive (nom, image, prix)

    [FE] Fiche produit (page détail)

    [FE] Filtres par catégorie

    [FE] Chargement dynamique des produits (via fetch/axios)

🛒 PANIER
🔧 Back-End

(Pas de persistance requise pour le panier côté back à ce stade)
🎨 Front-End

    [FE] Stockage du panier en local (Context API / Redux)

    [FE] Ajouter un produit au panier depuis la fiche

    [FE] Afficher le contenu du panier (page dédiée)

    [FE] Modifier la quantité d’un produit

    [FE] Supprimer un article du panier

    [FE] Calcul automatique du total

🧾 CHECKOUT & COMMANDES
🔧 Back-End

    [BE] Modèle Order (id, userId, total, status, date)

    [BE] Modèle OrderItem (orderId, productId, quantity, price)

    [BE] Route POST /api/orders (création de commande + déduction du stock)

    [BE] Route GET /api/orders/:userId (historique client)

    [BE] Route GET /api/admin/orders (admin)

🎨 Front-End

    [FE] Page de checkout avec :

        Formulaire de livraison

        Récapitulatif du panier

        Bouton "Passer la commande"

    [FE] Redirection vers une page de confirmation

    [FE] Affichage de l’historique des commandes dans le profil utilisateur

💳 PAIEMENT
🔧 Back-End

    [BE] Intégration de Stripe (création de session de paiement)

    [BE] Webhook pour valider une commande après paiement (facultatif)

🎨 Front-End

    [FE] Intégration Stripe Checkout (via SDK)

    [FE] Redirection vers le paiement

    [FE] Confirmation de paiement réussie ou échouée

👨‍💼 ADMIN
🔧 Back-End

    [BE] Routes sécurisées pour la gestion des produits et des commandes

    [BE] Statistiques (facultatif) : nombre de commandes, ventes, stock bas

🎨 Front-End

    [FE] Page d’administration des produits (CRUD)

    [FE] Tableau des commandes avec statut

    [FE] Possibilité de modifier le stock / supprimer un produit

    [FE] Login admin + accès restreint à certaines pages

⚙️ INFRA & DEPLOIEMENT
🔧 Back-End

    [BE] Déploiement API sur Render / Railway

    [BE] Ajout des variables d’environnement (.env, JWT, DB_URL)

    [BE] Configuration CORS, sécurité des headers, etc.

🎨 Front-End

    [FE] Déploiement front React sur Vercel

    [FE] Configuration des appels API selon l’environnement (dev/prod)
