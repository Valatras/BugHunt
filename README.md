# Bughunt

Bughunt est une application web et mobile de collecte et d'identification d'insectes.

Les utilisateurs peuvent :

* Découvrir différentes espèces d'insectes
* Consulter leurs caractéristiques et informations biologiques
* Compléter leur collection personnelle
* Gagner des points en découvrant de nouvelles espèces
* Suivre leur progression
* Utiliser l'application depuis le web ou un appareil mobile

Le projet est développé dans le cadre du cours de Développement Web et Mobile.

## Technologies utilisées

### Frontend

* React
* TanStack Start
* React Native
* Expo
* TailwindCSS

### Backend

* TypeScript
* oRPC
* Better Auth
* Prisma ORM
* PostgreSQL

### Infrastructure

* Docker
* Docker Compose
* Turborepo

---

# Installation

## Prérequis

* Git
* Node.js (version LTS recommandée)
* pnpm
* Docker
* Docker Compose

## Cloner le projet

```bash
git clone https://github.com/Valatras/BugHunt.git
```

## Installer les dépendances

Depuis la racine du projet :

```bash
pnpm install
```

## Démarrer l'environnement complet


```bash
docker compose up --build
```

Cette commande démarre :

* Le backend
* Le frontend web
* La base de données PostgreSQL
* Les services nécessaires au fonctionnement du projet

Lors des démarrages suivants :

```bash
docker compose up
```

suffit généralement. On peut maintenant utiliser les applications web et mobile.

---

# Accès à l'application

Une fois les conteneurs démarrés, on trouve les applications aux adresses suivantes :

Web :

```text
http://localhost:3001
```

Mobile (Expo) :

```text
http://localhost:8081
```


---

# Base de données

Le projet utilise PostgreSQL avec Prisma.

Les migrations et le schéma Prisma sont gérés automatiquement par l'environnement Docker.

Si nécessaire :

```bash
pnpm db:generate # pour générer le client Prisma
pnpm db:push # après que le docker compose ait démarré
pnpm db:reset # si besoin de réinitialiser la base de données
pnpm db:studio # pour accéder à Prisma Studio
pnpm db:seed # pour insérer des données de test
```

---

# Structure du projet

```text
bughunt/
├── apps/
│   ├── web/              # Application web
│   └── native/           # Application mobile Expo
│
├── packages/
│   ├── api/              # Logique métier et API
│   ├── auth/             # Authentification
│   ├── db/               # Prisma et accès aux données
│   └── ui/               # Composants partagés
│
├── docker-compose.yml
└── README.md
```

