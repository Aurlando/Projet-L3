# Fichiers Audio de Prononciation

Ce dossier contient les fichiers audio pour les prononciations des mots et phrases en malagasy.

## Structure recommandée

Les fichiers audio doivent être nommés selon le mot malagasy correspondant.

**Exemple :**
- `tongasoa.mp3` pour "Tongasoa"
- `salama.mp3` pour "Salama"
- `veloma.mp3` pour "Veloma"

## Formats supportés

Le composant `PronunciationButton` supporte les formats suivants :
- MP3
- WAV
- M4A
- AAC

## Utilisation dans les données de leçon

Pour ajouter un fichier audio à un mot dans une leçon, ajoutez le champ `audioFile` :

```javascript
{
  malagasy: "Tongasoa",
  french: "Bonjour / Bienvenue",
  pronunciation: "Tong-a-so-a",
  audioFile: require("../assets/vocaux/tongasoa.mp3")
}
```

## Ajout de fichiers audio

Pour ajouter de nouveaux fichiers audio :
1. Enregistrer ou télécharger le fichier audio
2. Le placer dans ce dossier (`assets/vocaux/`)
3. Ajouter le champ `audioFile` dans les données de la leçon correspondante

## Note

Les fichiers audio doivent être optimisés pour le mobile (taille raisonnable < 500KB par fichier recommandée).

