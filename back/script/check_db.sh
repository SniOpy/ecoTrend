#!/bin/bash

# Script de diagnostic de la base de données Render
# Usage: bash check_db.sh

set -e

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=== Diagnostic de la base de données ===${NC}\n"

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
    echo "  bash check_db.sh"
    exit 1
fi

echo -e "${YELLOW}1. Vérification de la connexion...${NC}"
if psql "$RENDER_DATABASE_URL" -c "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Connexion réussie${NC}\n"
else
    echo -e "${RED}✗ Erreur de connexion${NC}"
    exit 1
fi

echo -e "${YELLOW}2. Vérification des tables...${NC}"
TABLES=$(psql "$RENDER_DATABASE_URL" -t -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';" | xargs)

if [ -z "$TABLES" ]; then
    echo -e "${RED}✗ Aucune table trouvée${NC}"
    echo -e "${YELLOW}→ Les tables n'existent pas. Exécutez: bash init_render_db.sh${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Tables trouvées: $TABLES${NC}\n"
fi

echo -e "${YELLOW}3. Vérification des données...${NC}"

# Vérifier les catégories
CATEGORY_COUNT=$(psql "$RENDER_DATABASE_URL" -t -c 'SELECT COUNT(*) FROM "category";' | xargs)
echo -e "   Catégories: $CATEGORY_COUNT"

# Vérifier les produits
PRODUCT_COUNT=$(psql "$RENDER_DATABASE_URL" -t -c 'SELECT COUNT(*) FROM "product";' | xargs)
echo -e "   Produits: $PRODUCT_COUNT"

# Vérifier les utilisateurs
USER_COUNT=$(psql "$RENDER_DATABASE_URL" -t -c 'SELECT COUNT(*) FROM "user";' | xargs)
echo -e "   Utilisateurs: $USER_COUNT"

# Vérifier les commandes
ORDER_COUNT=$(psql "$RENDER_DATABASE_URL" -t -c 'SELECT COUNT(*) FROM "order";' | xargs)
echo -e "   Commandes: $ORDER_COUNT"

echo ""

if [ "$PRODUCT_COUNT" -eq 0 ]; then
    echo -e "${RED}✗ Aucun produit dans la base de données${NC}"
    echo -e "${YELLOW}→ Exécutez: bash init_render_db.sh pour initialiser les données${NC}"
    exit 1
else
    echo -e "${GREEN}✓ $PRODUCT_COUNT produits trouvés${NC}\n"
    
    echo -e "${YELLOW}4. Liste des produits:${NC}"
    psql "$RENDER_DATABASE_URL" -c 'SELECT id, name, price FROM "product";'
    
    echo -e "\n${GREEN}=== Diagnostic terminé ===${NC}"
    echo -e "${YELLOW}Si les produits sont présents mais l'API ne les retourne pas,${NC}"
    echo -e "${YELLOW}vérifiez les logs du service Render pour les erreurs de connexion.${NC}"
fi
