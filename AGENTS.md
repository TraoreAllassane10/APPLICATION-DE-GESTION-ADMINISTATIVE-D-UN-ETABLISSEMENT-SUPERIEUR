# APPLICATION DE GESTION D'UN ETABLISSEMENT SUPERIEUR

## Objectifs

Ce projet vise à digitaliser la gestion académique en offrant une plateforme centralisée pour :

La gestion des étudiants
La gestion et suivi des inscriptions
La gestion des paiements de scolairités
L’organisation des filières et niveaux
La gestion des enseignants
L’analyse des données via un dashboard
La gestions des enseignants
La gestions des matières
La gestions des classes
La gestions des evaluations
La gestions des notes
La gestion des moyennes
La gestion des bulletins

Favoriser des solutions simples, cohérentes avec l'architecture existance et facile à faire évoluer

## Règles de travail

- Avant toute modification, lire les fichiers concernés et identifier les conventions déjà en place
- Pour toute demande de modification, expliquer brièvement les fichiers à changer et l'impact attendu avant de commencer
- Ne pas modifier un fichier existant sans l’autorisation explicite de l’utilisateur.
- Ne pas modifier une migration existante. Créer une nouvelle migration si le schéma doit évoluer.
- Demander confirmation avant :
    - d'ajouter une dependance de production ;
    - de supprimer ou renommer un fichier ;
    - de modifier la structure de la base de données ;
    - de modifier les variables d’environnement, les clés ou les secrets ;
    - d’effectuer une action irréversible ou externe.
- Ne jamais exposer, copier ou inscrire des secrets dans le code, les logs ou la documentation.
- Limiter chaque changement à la demande en cours. Ne pas refactoriser du code non concerné sans le proposer.

## Qualité du code

- Écrire un code propre, simple, lisible et maintenable.
- Respecter les conventions de nommage, de formatage et l’architecture déjà présentes dans le dépôt.
- Éviter la complexité inutile.
- Commenter le code de manière concise et pertinente uniquement lorsque le code n’est pas évident.
- Préférer la réutilisation d'un composant, d'un service ou d'une regle existante à la duplication
- Éviter les composants, méthodes et contrôleurs trop volumineux ; extraire une responsabilité lorsque cela améliore clairement la lisibilité.
- Ajouter ou mettre à jour les tests lorsque le comportement métier change.
- Exécuter les vérifications disponibles et signaler clairement celles qui n’ont pas pu être exécutées.

## Frontend

- Chercher d'abord un composant existant dans le projet et shadcn/ui
- Si un composant shadcn/ui répond au besoin, l’utiliser.
- Sinon créer un composant cohérent avec les conventions de shadcn/ui et du projet.
- Ne pas modifier les fichiers fournis par shadcn/ui sans autorisation explicite.
- Préserver l’accessibilité : libellé du formulaire, etat de chargement, erreurs compréhensible, navigation par clavier et contraste suffisant.
- Gérer les états vides, de chargement, de succès et d’erreur pour chaque écran métier.
- Utiliser `react-hook-form` et `zod` pour la gestion des formulaires en suivant la pratique que shadcn propose.
- Le fontend est organié par fonctionnalité dans `resources\js\features`
- Chaque fichier repgroupe, selon les besoins :
    - `components` : composants metiers de propre à la fonctonnalité
    - `hooks` : Le métiers de la fonctionnalites
    - `types` : Les types de la fonctionnalité
    - `validators` :
    - `constants` : Les constants si nécessaire
      etc.
- Les pages se trouve dans `resources\js\pages`

## Backend

- Le backend est organisé par domaines fonctionnels dans `app\modules`.
- Chaque module regroupe, selon les besoins :
    - `Controllers` : coordination des requêtes HTTP ;
    - `Services`: Logique métier du module;
    - `Repositories`: Couche d'accès aux données;
    - `Requests` : validation et autorisation des données entrantes ;
    - `Resources` : transformation des réponses API ;
    - `Jobs` : traitements asynchrones ;
    - `Listeners` : réactions aux événements ;
    - `Events` : événements métier ;
    - `Notifications` : notifications utilisateur.
      etc.
- Utiliser les transactions de base de données lorsque plusieurs écritures doivent réussir ou échouer ensemble.
- Appliquer les autorisations côté serveur pour toute action ou donnée sensible.
- Retourner des réponses cohérentes, avec des messages d’erreur exploitables par le frontend.

## Base de données

- Nommer les tables, colonnes, index et clés étrangères de manière cohérente avec l’existant.
- Préserver l’intégrité des données avec des contraintes et des clés étrangères lorsque cela est approprié.
- Toute évolution du schéma passe par une nouvelle migration.
- Prévoir les index nécessaires pour les recherches et listes fréquemment utilisées.

## Fin de tache

Avant de considérer une tache comme terminée :

- Resumer le travail et ce qui a été modifié;
- Indiquer les fichiers touchés ;
- signaler les limites, risques ou actions restantes.
