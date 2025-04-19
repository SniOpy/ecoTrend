-- Permet de lancer POSTGRES
sudo -i -u postgres psql

-- On supprime les rôles S'IL EXISTE
DROP USER IF EXISTS bernardo;
-- On supprime la base de donnée SI ELLE EXISTE
DROP DATABASE IF EXISTS ecotrend;

-- Création du role et de la BDD

CREATE USER bernardo WITH PASSWORD 'Bernardo';
CREATE DATABASE ecotrend OWNER bernardo;