# le script sh s'éxécute avec la commande bash + le fichier de destination

# Je lance le script de création de role et de base de donnée
sudo -u postgres psql -f ./script/init_db.sql


export PGUSER=bernardo
export PGPASSWORD=Bernardo
export PGDATABASE=ecotrend


# Le script de création de table
psql -f ./script/create_table.sql


# # Le script d'import de data

psql -f ./script/import_data.sql