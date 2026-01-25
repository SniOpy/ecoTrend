#!/bin/bash

# Script pour initialiser la base de données Render
# Usage: bash init_render_db.sh

set -e

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=== Initialisation de la base de données Render ===${NC}\n"

# Vérification de la variable d'environnement
if [ -z "$RENDER_DATABASE_URL" ]; then
    echo -e "${RED}Erreur: RENDER_DATABASE_URL n'est pas définie${NC}"
    echo ""
    echo "Pour obtenir votre External Database URL:"
    echo "1. Allez dans le dashboard Render"
    echo "2. Ouvrez votre base de données"
    echo "3. Allez dans l'onglet 'Connect' ou 'Info'"
    echo "4. Copiez l'External Database URL"
    echo ""
    echo "Puis exécutez:"
    echo "  export RENDER_DATABASE_URL=\"postgresql://user:password@host:port/database\""
    echo "  bash init_render_db.sh"
    exit 1
fi

echo -e "${YELLOW}Étape 1: Création des tables...${NC}"
psql "$RENDER_DATABASE_URL" -f create_table.sql

if [ $? -ne 0 ]; then
    echo -e "${RED}Erreur lors de la création des tables${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Tables créées avec succès${NC}\n"

echo -e "${YELLOW}Étape 2: Insertion des données initiales...${NC}"
psql "$RENDER_DATABASE_URL" -f import_data.sql

if [ $? -ne 0 ]; then
    echo -e "${RED}Erreur lors de l'insertion des données${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Données insérées avec succès${NC}\n"

echo -e "${YELLOW}Étape 3: Vérification...${NC}"
PRODUCT_COUNT=$(psql "$RENDER_DATABASE_URL" -t -c 'SELECT COUNT(*) FROM "product";' | xargs)

if [ "$PRODUCT_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ $PRODUCT_COUNT produits trouvés dans la base de données${NC}"
else
    echo -e "${RED}✗ Aucun produit trouvé${NC}"
    exit 1
fi

echo -e "\n${GREEN}=== Initialisation terminée avec succès ! ===${NC}"
echo -e "${YELLOW}Vous pouvez maintenant tester l'API:${NC}"
echo "  curl https://ecotrend-4.onrender.com/products"
