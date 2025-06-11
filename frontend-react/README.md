
# 🏫 Écoles de Paris

Une application web interactive qui permet de visualiser, rechercher et filtrer les établissements scolaires (maternelles, élémentaires, collèges, lycées) de la ville de Paris à l’aide d’une carte géographique enrichie et d’une base de données centralisée.

---

## ✨ Fonctionnalités

- 🗺️ Affichage des écoles sur une carte interactive (Leaflet)
- 🔍 Recherche dynamique par nom d’école
- 🏙️ Filtrage par arrondissement de Paris
- 📷 Intégration Google Street View pour visualiser l’environnement de l’école
- 🔄 Données automatiquement importées depuis l’Open Data Paris
- 🔧 Stockage dans MongoDB & Neo4j pour des recherches avancées

---

## 🧱 Architecture

```
paris-schools-project/
│
├── backend/                # Serveur Node.js + Express
│   ├── models/             # Modèles Mongoose
│   ├── seedSchools.js      # Script d'importation des écoles
│   └── index.js            # Point d'entrée du backend (API)
│
├── frontend-react/         # Frontend React + Leaflet + Axios
│   ├── src/
│   │   ├── components/     # Composants React (SchoolList, SchoolMap, SearchBar)
│   │   └── App.jsx         # App principale
│   └── public/             # Fichiers statiques
│
└── README.md               # Ce fichier
```

---

## ⚙️ Stack technique

- **Frontend :** React, Vite, Leaflet, Axios
- **Backend :** Node.js, Express, Mongoose, Neo4j
- **Base de données :**
  - MongoDB (données structurées)
  - Neo4j (relation écoles <-> arrondissements)
- **API Tiers :** Open Data Paris, Google Street View API

---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/TonUser/EcoleParis.git
cd EcoleParis
```

### 2. Configuration

#### Backend (`/backend/.env`)

```env
MONGO_URI=mongodb://localhost:27017/paris-schools
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASS=your_password
PORT=5000
```

#### Frontend (`/frontend-react/.env`)

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_GOOGLE_API_KEY=your_google_maps_api_key
```

### 3. Lancer les serveurs

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd ../frontend-react
npm install
npm run dev
```

---

## 🌐 Accès à l'application

- Frontend : http://localhost:5173
- Backend API : http://localhost:5000/schools

---

## 📦 Script d'importation des écoles

Ce script importe automatiquement les établissements depuis les jeux de données publics :

```bash
cd backend
node seedSchools.js
```

Il enregistre les écoles dans :
- MongoDB (stockage)
- Neo4j (représentation géographique et relationnelle)

---

## 📸 Street View

Chaque école peut être affichée via Street View à partir de ses coordonnées.

> ⚠️ N’oublie pas d’ajouter ta **clé Google Maps API** dans `VITE_GOOGLE_API_KEY`.

---

## 🤝 Contribuer

Les PR sont les bienvenues ! Pour contribuer :

1. Fork le repo
2. Crée une branche `feature/mon-ajout`
3. Pousse et crée une Pull Request

---

## 📝 Licence

Ce projet est open-source, publié sous licence MIT.

---

## 👨‍💻 Auteur

- **Abdoulaye BALDE** – [GitHub](https://github.com/Thierno10-balde)
