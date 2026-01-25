#!/bin/bash

# Script de migration des données depuis Railway vers Render
# 
# Prérequis:
# 1. Avoir les credentials de la base de données Railway (DATABASE_URL)
# 2. Avoir les credentials de la base de données Render (DATABASE_URL)
# 3. Avoir pg_dump et psql installés localement
#
# Usage:
#   export RAILWAY_DATABASE_URL="postgresql://user:password@host:port/database"
#   export RENDER_DATABASE_URL="postgresql://user:password@host:port/database"
#   bash migrate_to_render.sh

set -e  # Arrêter en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Migration des données Railway -> Render ===${NC}\n"

# Vérification des variables d'environnement
if [ -z "$RAILWAY_DATABASE_URL" ]; then
    echo -e "${RED}Erreur: RAILWAY_DATABASE_URL n'est pas définie${NC}"
    echo "Exportez-la avec: export RAILWAY_DATABASE_URL='postgresql://...'"
    exit 1
fi

if [ -z "$RENDER_DATABASE_URL" ]; then
    echo -e "${RED}Erreur: RENDER_DATABASE_URL n'est pas définie${NC}"
    echo "Exportez-la avec: export RENDER_DATABASE_URL='postgresql://...'"
    echo "Vous pouvez la trouver dans le dashboard Render > Database > Internal Database URL"
    exit 1
fi

# Nom du fichier de sauvegarde temporaire
BACKUP_FILE="railway_backup_$(date +%Y%m%d_%H%M%S).sql"

echo -e "${YELLOW}Étape 1: Export des données depuis Railway...${NC}"
pg_dump "$RAILWAY_DATABASE_URL" \
    --no-owner \
    --no-acl \
    --clean \
    --if-exists \
    --format=plain \
    --file="$BACKUP_FILE"

if [ $? -ne 0 ]; then
    echo -e "${RED}Erreur lors de l'export depuis Railway${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Export réussi: $BACKUP_FILE${NC}\n"

echo -e "${YELLOW}Étape 2: Création des tables dans Render (si nécessaire)...${NC}"
# D'abord, créer les tables en utilisant le script existant
# Note: Vous devrez peut-être adapter cette partie selon votre structure
psql "$RENDER_DATABASE_URL" -f ../script/create_table.sql 2>/dev/null || echo "Les tables existent peut-être déjà"

echo -e "${YELLOW}Étape 3: Import des données dans Render...${NC}"
psql "$RENDER_DATABASE_URL" -f "$BACKUP_FILE"

if [ $? -ne 0 ]; then
    echo -e "${RED}Erreur lors de l'import dans Render${NC}"
    echo "Le fichier de sauvegarde est conservé: $BACKUP_FILE"
    exit 1
fi

echo -e "${GREEN}✓ Import réussi${NC}\n"

# Nettoyage
echo -e "${YELLOW}Nettoyage du fichier temporaire...${NC}"
rm "$BACKUP_FILE"
echo -e "${GREEN}✓ Fichier temporaire supprimé${NC}\n"

echo -e "${GREEN}=== Migration terminée avec succès ! ===${NC}"
echo -e "${YELLOW}N'oubliez pas de:${NC}"
echo "  1. Vérifier les données dans Render"
echo "  2. Tester l'API avec la nouvelle base de données"
echo "  3. Mettre à jour l'URL du backend dans le frontend si nécessaire"
