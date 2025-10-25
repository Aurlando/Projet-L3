# Hiteny - Quick Start

Application mobile développée avec **React Native** et **Expo SDK 54**.

---

## Prérequis

- Node.js v20.x (recommandé)
- npm
- Expo Go (SDK 54) sur votre téléphone
- Git

---

## Quick Start

```bash
# 1. Cloner le projet
git clone <url-du-projet>
cd Hiteny

# 2. Installer les dépendances
npm install

# 3. Désactiver CI si nécessaire
unset CI   # Git Bash / Linux
# ou
set CI=    # PowerShell / CMD

# 4. Lancer Expo avec cache nettoyé
npx expo start -c
