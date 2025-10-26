// data/places/alleBaobab.js

export default {
    id: "alleeBaobab",
    category: "Lieux",
  
    // 1. Fiche d’Aperçu (card sur l’écran “Découvrir”)
  preview: {
    image: require("../../assets/image/alle-baobab.jpg"), // à adapter selon ton image
      title: "L'Allée des Baobabs",
      tagline: "Le paysage emblématique de l'Ouest malgache.",
      badge: "Lieux",
      shortInfo: "Arbres Millénaires, classés Monument Naturel.",
    },
  
    // 2. Page de Détails
    details: {
      header: {
        bannerImage: require("../../assets/image/alle-baobab.jpg"), // bannière principale
        title: "L'Allée des Baobabs : Les Gardiens Millénaires",
        introduction:
          "Située dans la région de Menabe, l'Allée des Baobabs est l'un des paysages les plus célèbres de Madagascar. Cet alignement majestueux d'arbres géants, qui bordent une simple route de terre, est le vestige d'une ancienne forêt et offre un spectacle inoubliable, surtout à l'heure du crépuscule.",
        makiMessage:
          'Maki te dit : "L\'Allée des Baobabs, ce n\'est pas juste une photo ! C\'est le meilleur endroit pour respirer profondément et sentir la magie du soleil se coucher sur l\'Ouest malgache. Un jour, tu y seras !"',
      },
  
      identity: {
        localisation: "Région de Menabe (Ouest). Près de Morondava.",
        meaning: 'Le baobab est le Renala (Mère de la Forêt) en malgache.',
        heritageType: "Monument Naturel, Aire Protégée.",
        keySpecies:
          "L'Adansonia Grandidieri, la plus grande des six espèces endémiques de baobabs de Madagascar.",
      },
  
      focus: {
        title: "Histoires, Légendes et Secrets du Renala",
        content: [
          {
            subtitle: "L'Arbre Renversé",
            text: "La légende la plus célèbre raconte que les dieux auraient arraché le baobab et l'auraient replanté à l'envers, en punition de son arrogance. C'est pourquoi ses branches ressemblent à des racines pointant vers le ciel.",
          },
          {
            subtitle: "L'Âge Vénérable",
            text: "Les arbres qui forment l'Allée ont survécu à la déforestation car leur bois est spongieux et ne peut pas être utilisé pour la construction. Leur âge est estimé entre 800 et 1000 ans.",
          },
          {
            subtitle: "Les Baobabs Amoureux",
            text: "Un peu plus loin, vous trouverez deux baobabs torsadés l'un à l'autre, formant un couple inséparable. Selon les croyances, ils portent bonheur aux amoureux qui les visitent.",
          },
        ],
      },
  
      location: {
        title: "Où se trouve l'Allée ?",
        description:
          "L'Allée borde la Route Nationale 8 (RN8) entre Morondava et Belo sur Tsiribihina.",
        mapImage: require("../../assets/image/Map-Baobab.png"),
        visitTips:
          "L'heure de pointe est le coucher du soleil (vers 17h00-18h00) lorsque les ombres sont les plus longues et les couleurs les plus spectaculaires.",
      },
  
      didYouKnow: {
        title: "Le Saviez-vous ?",
        image: require("../../assets/image/le-saviez-vous.png"), // image d’un pont suspendu ou d’un lémurien
        text: "Les Malagasy appellent le baobab le 'Renala' ? C'est le mot qui signifie littéralement 'Mère de la Forêt' !",
        icon: "maki", // indique qu’on peut utiliser la tête de Maki comme icône à côté du titre
      },
  
      ending: {
        suggestion:
          "Prêt à en apprendre davantage ? Passe à la leçon de vocabulaire pour savoir comment demander le chemin vers l'Allée des Baobabs en malgache",
      },
    },
  };
  