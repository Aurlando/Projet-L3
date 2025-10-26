# Guide d'ajout de nouvelles leçons

Ce système permet d'ajouter facilement de nouvelles leçons sans modifier le code principal.

## Comment ajouter une nouvelle leçon

### 1. Créer le fichier de leçon

Créez un nouveau fichier `lessonX.js` dans le dossier `data/lessons/` où X est le numéro de la leçon suivant la dernière.

Exemple : Si la dernière leçon est `lesson3.js`, créez `lesson4.js`

### 2. Structure du fichier

```javascript
export default {
    id: 4, // Numéro de la leçon (commence à 1)
    title: "Nom de la leçon",
    subtitle: "Description courte de la leçon",
    steps: [
        {
            id: 1,
            type: "introduction",
            title: "Bienvenue dans cette leçon !",
            content: "Description de la leçon",
            image: require("../../assets/lemurien.png"),
        },
        {
            id: 2,
            type: "vocabulary",
            title: "Titre du vocabulaire",
            content: [
                {
                    malagasy: "Mot en malgache",
                    french: "Traduction française",
                    pronunciation: "Pro-non-ci-ation", // Optionnel
                },
                // ... autres mots
            ],
        },
        {
            id: 3,
            type: "quiz",
            title: "Testez vos connaissances",
            questions: [
                {
                    question: "Question ?",
                    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
                    correct: 0, // Index de la bonne réponse (0 = première option)
                },
                // ... autres questions
            ],
        },
        // Vous pouvez ajouter d'autres étapes (practice, etc.)
    ],
};
```

### 3. Types d'étapes disponibles

-   **introduction** : Écran d'accueil avec image et description
-   **vocabulary** : Liste de mots avec traduction
-   **quiz** : Questions à choix multiples
-   **practice** : Exercice pratique

### 4. Importer la leçon dans lessonsData.js

Ouvrez `data/lessons/lessonsData.js` et ajoutez :

```javascript
import lesson1 from "./lesson1";
import lesson2 from "./lesson2";
import lesson3 from "./lesson3";
import lesson4 from "./lesson4"; // ← Nouvelle importation

export const lessonsData = [lesson1, lesson2, lesson3, lesson4]; // ← Ajout au tableau
```

## Exemple complet

Consultez `lesson1.js` pour voir un exemple complet d'une leçon avec tous les types d'étapes.

## Fonctionnalités automatiques

-   ✅ La leçon est automatiquement affichée dans la liste
-   ✅ La progression est sauvegardée dans Firestore
-   ✅ La leçon suivante est débloquée si le score >= 60%
-   ✅ Le quiz affiche une question à la fois
-   ✅ Le score est calculé à la fin du quiz

## Conseils

-   **Nombre de questions** : Au moins 3 questions pour un quiz valide
-   **Score minimum** : 60% pour débloquer la leçon suivante
-   **Difficulté** : Automatiquement déterminée par l'ID de la leçon
    -   ID 1-2 : Débutant (vert)
    -   ID 3-5 : Intermédiaire (orange)
    -   ID 6+ : Avancé (rouge)
