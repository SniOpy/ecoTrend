BEGIN;

-- Insertion de catégories
INSERT INTO "category" ("name_category")
VALUES 
('T-shirt'),
('Chaussures'),
('Jeans'),
('Accessoires'),
('Pulls');


-- Insertion d'utilisateurs
INSERT INTO "user" ("firstname", "lastname", "email", "user_password", "role_user")
VALUES 
('Alice', 'Dupont', 'alice@example.com', '$2b$12$ADELEKs6qc35c9Cr46SknuxDXVl59bDt30jSeJ07aVw3h/OM27OaC', 'admin'),
('Bob', 'Martin', 'bob@example.com', '$2y$10$2lxnieqamoRxNRYep7Dtqe8sE3Fnm2v3.lhnzvk71k1tdKT2DLQ9q', 'user');

-- Insertion de produits
INSERT INTO "product" ("name_product", "description_product", "price", "stock", "image_product", "category_id")
VALUES 
('Jeans', 'Jean éco-lavé en coton recyclé, confortable et durable au quotidien.', 59.99, 10, 'jeans.png', 3),
('Sweater', 'Pull en lin naturel, léger, respirant et parfait pour la mi-saison.', 199.99, 5, 'sweater.png', 5), 
('Chaussures', 'Sneakers unisexes en matériaux recyclés, à la fois stylées et responsables.', 119.90, 20, 'chaussures.png', 2),
('Casquette', 'Casquette minimaliste en toile de coton biologique non teintée.', 21.99, 20, 'casquette.png', 4),
('Tote', 'Sac fourre-tout en toile bio, solide et pratique pour vos essentiels.', 45.99, 20, 'tote.png', 4),
('Porte-feuille', 'Compact, léger et 100 % végétal, ce portefeuille en liège allie esthétique naturelle et durabilité.', 18.75, 20, 'porte-feuille.png', 4),
('Echarpe', 'Élégante et douce, cette écharpe en coton biologique offre confort et légèreté.', 45.99, 20, 'echarpe.png', 4);

-- Insertion de commandes
INSERT INTO "order" ("user_id", "status_order")
VALUES 
(1, 'en cours'),
(2, 'livrée');

COMMIT;
