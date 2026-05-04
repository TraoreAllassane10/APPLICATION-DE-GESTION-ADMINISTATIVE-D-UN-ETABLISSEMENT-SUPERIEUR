# Application de gestion d'un etablissement supérieur

Une application web complète de gestion d’établissement supérieur permettant de gérer efficacement les étudiants, les inscriptions les paiements de scolarites , les années académiques etc.

## Objectifs du projet

Ce projet vise à digitaliser la gestion académique en offrant une plateforme centralisée pour :

- La gestion des étudiants
- La gestion et suivi des inscriptions
- La gestion des paiements de scolairités
- L’organisation des filières et niveaux
- La gestion des enseignants
- L’analyse des données via un dashboard

## Fonctionnalités principale

1. Gestion académiques

### Gestion des années académique

- CRUD années académique
- Activation et desactivation d'une année

### Gestion des étudiants

- Création, modification, suppression d’étudiants
- Recherche et filtrage
- Visualisation du profil complet d'etudiant
- Visualisation du parcours d'etudiants (inscriptions passées)
- Impression de la fiche d'identification (PDF)
- Impression du certificat de scolarité (PDF)

### Gestion des inscriptions

- Inscription d’un étudiant par année académique
- Association à un niveau et une filière
- Gestion multi-inscriptions
- Statistiques (Somme total des inscriptions, Somme total payées, somme restante)

### Gestion des paiements de scolarités

- Enregistrement d'un paiement
- Impression du reçu d'un paiements à tout moment (PDF)
- Visualisation de la progession des paiements d'une inscription
- Impression du recapitulatif des paiemeents d'un etudiants

### Gestion des enseignants

- CRUD complet des enseignants
- Export de la liste des enseignants selon l'année

### Gestions des fillières et niveaux

- CRUD filière
- CRUD Niveaux
- Géneration de la liste des classes (PDF)

### Dashboard & statistiques

- Nombre total d’étudiants
- Nombre d’inscriptions
- Répartition par niveau (graphique)
- Visualisation des données

### Système de logs (audit)

- Historique des actions (création, modification, suppression)
- Traçabilité des utilisateurs

2. Gestion d'entreprise

### Gestion du personnels
- Ajout des employés avec leur formations, experiences et documents (pdf, doc, jpg, jpeg, etc.)
- Modification des employés
- Visualisation des profils avec la possiblité de voir les pièces jointes

## Stack technique

### Backend

- Laravel
- API REST
- Laravel Eloquent ORM
- Spatie (gestion des rôles et permissions)
- Laravel Excel

### Frontend

- React
- Inertia.js
- Tailwind CSS

### Base de données

- MySQL

## Structure du projet

```text
app/
├── Enums/
├── Observers/
├── Models/
├── Http/
│ ├── Controllers/
│ ├── Requests/
├── Services/
├── Repositories/

database/
├── migrations/
├── factories/
├── seeders/

resources/
├── js/
│ ├── Pages/
│ ├── Components/

routes/
├── web.php
├── api.php
```

## Installation

1. Cloner le projet

```bash
    git clone https://github.com/TraoreAllassane10/Gestion-Emploi-Temps.git
```

2. Installer les dépendances

```bash
    composer install
    npm install
```

3. Configuration

```bash
    cp .env.example .env
    php artisan key:generate
```

4. Migration & Seed

```bash
    php artisan migrate --seed
```

5. Lancer le projet

```bash
    php artisan serve
    npm run dev
```

6. Tests

```bash
    php artisan test
```

## Authentification & rôles

Gestion des rôles avec Spatie :

- Admin
- Secretaire de scolarité

## Architecture

- Controllers → très légers
- Services → logique métier
- Repositories → accès aux données
