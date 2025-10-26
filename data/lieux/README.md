# Guide d'ajout de nouveaux lieux

Ce système permet d'ajouter facilement de nouveaux lieux sans modifier le code principal, basé sur le modèle des leçons.

## Comment ajouter un nouveau lieu

### 1. Créer le fichier de lieu

Créez un nouveau fichier dans le dossier `data/lieux/` (ex: `baobabs.js`, `nosyBe.js`).

### 2. Structure du fichier

```javascript
export default {
  id: "baobabs", // Identifiant unique (sans espaces)
  category: "Lieux", // Catégorie du lieu
  
  // 1. Fiche d'Aperçu (card sur la page "Lieux")
  preview: {
    image: require("../../assets/places/baobabs-preview.jpg"),
    title: "L'Allée des Baobabs",
    tagline: "Lieu emblématique du coucher de soleil",
    badge: "Lieux",
    shortInfo: "Avenue de baobabs spectaculaires.",
  },

  // 2. Page de Détails
  details: {
    header: {
      bannerImage: require("../../assets/places/baobabs-banner.jpg"),
      title: "Titre complet du lieu",
      introduction: "Description détaillée...",
      makiMessage: 'Message de Maki avec des conseils ou anecdotes !',
    },

    identity: {
      localisation: "Région et ville",
      meaning: "Signification du nom",
      heritageType: "Type de patrimoine",
      keySpecies: "Espèces importantes",
    },

    focus: {
      title: "Titre de la section focus",
      content: [
        {
          subtitle: "Sous-titre 1",
          text: "Contenu détaillé...",
        },
        {
          subtitle: "Sous-titre 2",
          text: "Plus de contenu...",
        },
      ],
    },

    location: {
      title: "Titre de la section localisation",
      description: "Description de la localisation",
      mapImage: require("../../assets/places/baobabs-map.jpg"),
      visitTips: "Conseils pour visiter",
    },

    didYouKnow: {
      title: "Le Saviez-vous ?",
      image: require("../../assets/places/baobabs-funfact.jpg"),
      text: "Anecdote intéressante",
      icon: "maki",
    },

    ending: {
      suggestion: "Suggestion finale ou message d'inspiration",
    },
  },
};
```

### 3. Importer le lieu dans lieuxData.js

Ouvrez `data/lieux/lieuxData.js` et ajoutez :

```javascript
import tsingy from "./tsingy";
import baobabs from "./baobabs"; // ← Nouvelle importation

export const lieuxData = [tsingy, baobabs]; // ← Ajout au tableau
```

## Exemple complet

Consultez `tsingy.js` pour voir un exemple complet d'un lieu avec toutes les sections.

## Sections disponibles

### `preview` (obligatoire)
- **image** : Image de prévisualisation
- **title** : Titre court
- **tagline** : Accroche
- **badge** : Catégorie
- **shortInfo** : Description courte

### `details.header` (obligatoire)
- **bannerImage** : Grande image d'en-tête
- **title** : Titre complet
- **introduction** : Description principale
- **makiMessage** : Message du lemurien (optionnel)

### `details.identity` (recommandé)
- **localisation** : Où se trouve le lieu
- **meaning** : Signification du nom
- **heritageType** : Type de patrimoine
- **keySpecies** : Espèces importantes

### `details.focus` (optionnel)
- **title** : Titre de section
- **content** : Tableau d'objets avec `subtitle` et `text`

### `details.location` (recommandé)
- **title** : Titre de la section
- **description** : Description de l'emplacement
- **mapImage** : Image de carte
- **visitTips** : Conseils de visite

### `details.didYouKnow` (optionnel)
- **title** : "Le Saviez-vous ?"
- **image** : Image illustrative
- **text** : Texte d'anecdote
- **icon** : Nom de l'icône

### `details.ending` (optionnel)
- **suggestion** : Message de fin

## Gestion des images

Ajoutez vos images dans le dossier `assets/places/` :
- `nom-lieu-preview.jpg` : Image de prévisualisation (ratio 16:9 recommandé)
- `nom-lieu-banner.jpg` : Grande bannière (ratio large)
- `nom-lieu-map.jpg` : Carte du lieu
- `nom-lieu-funfact.jpg` : Image pour l'anecdote

## Navigation

La page "Lieux" est accessible depuis :
- La page "Découvrir" → Clique sur la catégorie "Lieux"
- Le menu de navigation (si configuré)

## Fonctionnalités automatiques

- ✅ Le lieu est automatiquement affiché dans la liste
- ✅ Navigation fluide vers la page de détails
- ✅ Design cohérent avec l'application
- ✅ Images optimisées et responsive

