# Facebook Events API

Voici le lien conduisant à la documentation de mon projet: **https://documenter.getpostman.com/view/49575970/2sB3Wny2uN**

> API REST complète permettant de gérer des **utilisateurs**, **groupes**, **événements**, **fils de discussion**, **albums photos**, **sondages** et **billetterie** pour un réseau social de type **Facebook Events** .

---

## 🚀 Objectif du projet

Ce projet a été réalisé dans le cadre du cours **API & Web Services**.
L’objectif est de concevoir et développer une API RESTful sécurisée, documentée et conforme aux bonnes pratiques professionnelles.

L’API permet à des utilisateurs de :
- Créer et gérer des événements publics/privés
- Créer ou rejoindre des groupes
- Publier des messages et fils de discussion
- Partager des albums et des photos
- Créer et répondre à des sondages
- Gérer une billetterie avec achat de billets en ligne

---

## Technologies utilisées

| Outil / Librairie | Rôle |
|--------------------|------|
| **Node.js** | Environnement d’exécution |
| **Express.js** | Framework web principal |
| **Mongoose** | ORM pour MongoDB |
| **MongoDB Atlas** | Base de données NoSQL |
| **bcrypt** | Hashage des mots de passe |
| **jsonwebtoken (JWT)** | Authentification sécurisée |
| **helmet + cors + compression** | Sécurité & performance |
| **swagger-ui-express** | Documentation interactive |
| **Postman** | Tests manuels des endpoints |

---

## Architecture du projet

api/
├─ src/
│   ├─ index.mjs              → Point d’entrée du serveur
│   ├─ server.mjs             → Configuration Express & MongoDB
│   ├─ config.mjs             → Configuration des environnements
│   ├─ controllers/           → Logique métier et routes HTTP
│   │   ├─ users.mjs
│   │   ├─ groups.mjs
│   │   ├─ events.mjs
│   │   ├─ threads.mjs
│   │   ├─ messages.mjs
│   │   ├─ albums.mjs
│   │   ├─ photos.mjs
│   │   ├─ polls.mjs
│   │   ├─ pollVotes.mjs
│   │   ├─ ticketTypes.mjs
│   │   ├─ ticketOrders.mjs
│   │   └─ routes.mjs
│   ├─ models/                → Schémas Mongoose
│   │   ├─ user.mjs
│   │   ├─ group.mjs
│   │   ├─ event.mjs
│   │   ├─ album.mjs
│   │   ├─ photo.mjs
│   │   ├─ poll.mjs
│   │   ├─ pollVote.mjs
│   │   ├─ ticketType.mjs
│   │   └─ ticketOrder.mjs
│   └─ docs/
│       ├─postman_collection.json → Tests API Postman
├─ package.json
└─ README.md

## Installation

### Prérequis
- Node.js ≥ 18
- MongoDB Atlas ou local
- npm ou yarn
- Postman (pour les tests)

### Étapes
``bash
# 1. Cloner le projet
git clone https://github.com/<TON_USER>/facebook-events-api-efrei.git

# 2. Se placer dans le dossier
cd facebook-events-api-efrei/api

# 3. Installer les dépendances
npm install

# 4. Lancer en mode développement
npm run dev

# ou en mode production
npm run prod

## Configuration

Dans api/src/config.mjs, modifie la variable MongoDB :

export default {
  development: {
    port: 3000,
    mongodb: 'mongodb+srv://<user>:<password>@apicluster.vhyvsrb.mongodb.net/efrei'
  }
};
