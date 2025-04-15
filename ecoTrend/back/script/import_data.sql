BEGIN;

-- Insertion de catégories
INSERT INTO "category" ("name_category")
VALUES 
('Électronique'),
('Maison'),
('Livres');

-- Insertion d'utilisateurs
INSERT INTO "user" ("firstname", "lastname", "email", "user_password", "role_user")
VALUES 
('Alice', 'Dupont', 'alice@example.com', 'password123', 'admin'),
('Bob', 'Martin', 'bob@example.com', 'password456', 'user');

-- Insertion de produits
INSERT INTO "product" ("name_product", "description_product", "price", "stock", "image_product", "category_id")
VALUES 
('Smartphone', 'Un super smartphone', 499.99, 10, 'smartphone.jpg', 1),
('Aspirateur', 'Aspirateur silencieux', 199.99, 5, 'aspirateur.jpg', 2),
('Roman SF', 'Un roman de science-fiction captivant', 15.99, 20, 'livre_sf.jpg', 3);

-- Insertion de commandes
INSERT INTO "order" ("user_id", "status_order")
VALUES 
(1, 'en cours'),
(2, 'livrée');

COMMIT;
