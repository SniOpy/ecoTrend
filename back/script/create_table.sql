-- Fichier de création des tables de la DB
BEGIN;
-- Suppression des tables

DROP TABLE IF EXISTS "user", "order", "product", "category";


-- Création des tables

CREATE TABLE "user" (
  id INTEGER  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  firstname VARCHAR(42) NOT NULL,
  lastname VARCHAR(42) NOT NULL,
  email VARCHAR(42) NOT NULL UNIQUE,
  user_password VARCHAR(72) NOT NULL,
  role_user VARCHAR(42),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE "product" (
  id INTEGER  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(42) NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  stock INTEGER DEFAULT 0,
  image VARCHAR(42) NOT NULL,
  category_id INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE "category" (
    id INTEGER  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name_category VARCHAR(42) NOT NULL,  
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE "order" (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL,
    status_order VARCHAR(42) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

COMMIT;