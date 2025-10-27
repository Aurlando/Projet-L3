# Cultures de Madagascar

Ce dossier contient les données pour les fiches culturelles affichées dans l'application.

## Structure des fichiers

Chaque culture doit être définie dans un fichier séparé avec la structure suivante :

### Structure de base

```javascript
export default {
    id: "nomCulture",           // Identifiant unique
    category: "Culture",         // Catégorie (toujours "Culture")
    
    // Fiche d'aperçu (affichée dans la liste)
    preview: {
        image: require("../../assets/image/culture.jpg"),
        title: "Le titre",
        tagline: "La description courte",
        badge: "Culture",
        shortInfo: "Information rapide"
    },
    
    // Page de détails
    details: {
        header: {
            bannerImage: require("../../assets/image/culture.jpg"),
            title: "Le titre complet",
            introduction: "Texte d'introduction",
            makiMessage: "Message de Maki"
        },
        identity: {
            localisation: "Localisation",
            meaning: "Signification",
            heritageType: "Type de patrimoine",
            keyElement: "Élément clé"
        },
        focus: {
            title: "Titre de la section",
            content: [
                {
                    subtitle: "Sous-titre",
                    text: "Texte explicatif"
                }
            ]
        },
        location: {
            title: "Titre",
            description: "Description",
            visitTips: "Conseils de visite"
        },
        ending: {
            suggestion: "Message de conclusion"
        }
    }
};
```

## Exemple

Le fichier `hiraGasy.js` contient les informations sur le Hira Gasy, un art traditionnel malgache.

## Ajout de nouvelles cultures

Pour ajouter une nouvelle culture :

1. Créer un nouveau fichier dans ce dossier (ex: `zebu.js`)
2. Suivre la structure ci-dessus
3. Ajouter l'import dans `culturesData.js`
4. Ajouter l'image correspondante dans `assets/image/`

Les cultures seront automatiquement affichées dans la page "Culture" de l'application.

