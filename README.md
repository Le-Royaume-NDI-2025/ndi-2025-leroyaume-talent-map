# TalentMap - Plateforme de Gestion des Talents

## Description

TalentMap est une plateforme web moderne permettant de cartographier, visualiser et gérer les compétences au sein d'une organisation. L'application offre une interface intuitive pour créer des profils de talents, rechercher des compétences spécifiques, et visualiser les relations entre collaborateurs.

## Technologies

### Backend
- **Java 21** avec **Spring Boot 4.0**
- **PostgreSQL 16** pour la persistance des données
- **Spring Security** avec authentification JWT
- **JPA/Hibernate** pour la gestion des entités
- **MapStruct** pour le mapping DTO/Entity
- **Swagger/OpenAPI** pour la documentation de l'API

### Frontend
- **React 18** avec **TypeScript**
- **Vite** comme outil de build
- **TailwindCSS** pour le design
- **Radix UI** pour les composants accessibles
- **React Router** pour la navigation
- **Axios** pour les appels API

### Infrastructure
- **Docker** et **Docker Compose** pour le déploiement local
- **Kubernetes** avec **Helm** pour le déploiement production
- **GitHub Actions** pour l'intégration continue
- **ArgoCD** pour le déploiement GitOps
- **Nginx** comme reverse proxy

## Critères d'Évaluation

### 1. Qualité Technique (40 points)

#### Fonctionnalités Réalisées (20 pts)

**Gestion des Profils Talents**
- Création et modification de profils utilisateur complets
- Upload et gestion de photos de profil
- Authentification sécurisée avec JWT
- Système de rôles (ADMIN, USER)

**Gestion des Compétences**
- CRUD complet des compétences (skills)
- Association de compétences aux profils talents
- Niveaux de maîtrise pour chaque compétence
- Catégorisation des compétences

**Recherche et Filtrage**
- Recherche de talents par compétences
- Filtres multicritères (rôle, compétences, niveau)
- Recherche textuelle avancée
- Résultats paginés pour de meilleures performances

**Visualisations**
- Vue carte interactive des talents
- Nuage de compétences dynamique
- Graphiques de répartition des compétences
- Tableaux de bord personnalisés

**Système de Validation**
- Badge "Validé" pour les profils vérifiés
- Système d'approbation par les administrateurs
- Historique des modifications

#### Stabilité et Utilisation Réelle (10 pts)

**Architecture Robuste**
- Backend stateless permettant la scalabilité horizontale
- Gestion d'erreurs complète avec messages explicites
- Validation des données côté backend et frontend
- Transactions database pour l'intégrité des données

**Tests et Qualité**
- Configuration Maven pour les tests unitaires
- Health checks pour la supervision (Actuator)
- Logging structuré pour le débogage
- CI/CD automatisé avec GitHub Actions

**Performance**
- Optimisation des requêtes SQL avec JPA
- Pagination des résultats
- Cache des assets statiques (Nginx)
- Compression gzip activée
- Images Docker optimisées multi-stage

#### Qualité du Code et Structure (10 pts)

**Organisation du Projet**
```
talent-map/
├── backend/               # API Spring Boot
│   ├── src/main/java/
│   │   └── dev/royaumendi/talentmap/
│   │       ├── config/   # Configuration (Security, CORS, Web)
│   │       ├── controller/ # REST Controllers
│   │       ├── dto/      # Data Transfer Objects
│   │       ├── entity/   # JPA Entities
│   │       ├── mapper/   # MapStruct Mappers
│   │       ├── repository/ # Spring Data Repositories
│   │       └── service/  # Business Logic
│   └── Dockerfile
├── frontend/             # Application React
│   ├── src/
│   │   ├── components/  # Composants réutilisables
│   │   ├── pages/       # Pages de l'application
│   │   ├── services/    # Services API
│   │   ├── types/       # Types TypeScript
│   │   └── utils/       # Utilitaires
│   └── Dockerfile
├── helm/                # Charts Helm pour Kubernetes
└── .github/workflows/   # CI/CD GitHub Actions
```

**Bonnes Pratiques**
- Architecture en couches (Controller → Service → Repository)
- Séparation des préoccupations (concerns)
- DTOs pour la sécurité et l'encapsulation
- Types TypeScript stricts côté frontend
- Configuration externalisée (ConfigMaps, Secrets)
- Code documenté (Swagger, commentaires)

### 2. UX / UI (30 points)

#### Ergonomie (15 pts)

**Navigation Intuitive**
- Menu de navigation clair et accessible
- Breadcrumbs pour se situer dans l'application
- Navigation cohérente entre les différentes sections
- Responsive design pour tous les écrans

**Parcours Utilisateur Optimisé**
- Authentification simple et rapide
- Création de profil guidée
- Recherche de talents en quelques clics
- Ajout de compétences facilité

**Formulaires Clairs**
- Labels explicites pour tous les champs
- Validation en temps réel
- Messages d'erreur compréhensibles
- Indicateurs de champs requis

#### Design et Lisibilité (15 pts)

**Aspect Visuel Cohérent**
- Design system basé sur TailwindCSS
- Palette de couleurs harmonieuse
- Typographie lisible et hiérarchisée
- Espacement cohérent

**Visualisation Efficace**
- Cartes interactives pour localiser les talents
- Nuages de mots pour les compétences
- Graphiques pour les statistiques
- Badges visuels pour les statuts

**Accessibilité**
- Composants Radix UI accessibles WCAG
- Contraste suffisant pour la lisibilité
- Navigation au clavier possible
- Sémantique HTML correcte

### 3. Pertinence et Cohérence (30 points)

#### Adéquation au Sujet (15 pts)

**Réponse au Besoin "Carte des Talents"**
- Visualisation géographique ou organisationnelle des talents
- Recherche multicritères pour trouver les bonnes compétences
- Profils détaillés avec compétences et niveaux
- Système de mise en relation entre talents

**Fonctionnalités Métier**
- Gestion complète du cycle de vie des talents
- Suivi des compétences et de leur évolution
- Validation par les administrateurs
- Recherche et matching de compétences

#### Cohérence et Maturité du Produit (15 pts)

**Solution Homogène**
- Architecture cohérente frontend/backend
- API RESTful bien structurée
- Documentation technique complète
- Déploiement automatisé

**Utilisabilité**
- Application prête pour la production
- Documentation d'installation (KUBERNETES_DEPLOYMENT.md)
- Scripts de déploiement fournis
- Monitoring et health checks configurés

**Évolutivité**
- Architecture scalable (Kubernetes ready)
- Code modulaire et maintenable
- API versionnée et documentée
- Base de code propre pour futures évolutions

## Installation et Déploiement

### Prérequis
- Docker et Docker Compose (développement local)
- Kubernetes cluster (production)
- Helm 3+ (production)
- Node.js 20+ et Java 21 (développement)

### Développement Local

```bash
# Cloner le repository
git clone <repository-url>
cd talent-map

# Lancer avec Docker Compose
docker-compose up -d

# Accéder à l'application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
# Swagger: http://localhost:8080/swagger-ui.html
```

### Déploiement Production (Kubernetes)

Voir la documentation complète dans [KUBERNETES_DEPLOYMENT.md](KUBERNETES_DEPLOYMENT.md)

```bash
# Créer les secrets Kubernetes
kubectl create secret docker-registry harbor-registry-secret \
  --docker-server=registry.axelfrache.me \
  --docker-username=<username> \
  --docker-password=<password> \
  -n talentmap

kubectl create secret generic postgres-secret \
  --from-literal=POSTGRES_PASSWORD=<password> \
  -n talentmap

kubectl create secret generic jwt-secret \
  --from-literal=JWT_SECRET=<secret> \
  -n talentmap

# Déployer avec Helm
helm install talentmap helm/talentmap \
  -f helm/talentmap/values-prod.yaml \
  -n talentmap --create-namespace
```

## API Documentation

L'API REST est documentée avec Swagger/OpenAPI et accessible à `/swagger-ui.html` une fois l'application démarrée.

### Endpoints Principaux

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Authentification
- `GET /api/users` - Liste des utilisateurs
- `GET /api/users/{id}` - Détails d'un utilisateur
- `PUT /api/users/{id}` - Mise à jour du profil
- `GET /api/skills` - Liste des compétences
- `POST /api/skills` - Création d'une compétence
- `GET /api/user-skills` - Compétences par utilisateur

## Auteurs

Projet réalisé dans le cadre de la Nuit de l'Info 2025 par l'équipe Le Royaume.

## Licence

Ce projet est sous licence propriétaire.
