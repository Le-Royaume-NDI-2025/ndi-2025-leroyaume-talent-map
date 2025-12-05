#!/bin/bash
# Script de déploiement rapide pour production

echo "🚀 Déploiement Talent Map Production"
echo "======================================"

# Vérifier si .env.prod existe
if [ ! -f .env.prod ]; then
    echo "❌ Erreur: .env.prod n'existe pas !"
    echo "Créez le fichier .env.prod avec les bonnes variables."
    exit 1
fi

# Charger les variables
echo "📋 Chargement des variables d'environnement..."
export $(cat .env.prod | grep -v '^#' | xargs)

# Arrêter les conteneurs
echo "🛑 Arrêt des conteneurs existants..."
docker-compose -f docker-compose.prod.yml down

# Rebuild tout
echo "🔨 Rebuild des images..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod build --no-cache

# Démarrer
echo "▶️  Démarrage des services..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Attendre que le backend démarre
echo "⏳ Attente du démarrage du backend..."
sleep 10

# Afficher les logs
echo ""
echo "📊 Statut des conteneurs:"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "✅ Déploiement terminé !"
echo ""
echo "🌐 URLs:"
echo "   Frontend: https://talents.royaumendi.dev"
echo "   Backend:  https://talentsapi.royaumendi.dev"
echo ""
echo "📋 Commandes utiles:"
echo "   Voir les logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "   Arrêter:       docker-compose -f docker-compose.prod.yml down"
echo ""
