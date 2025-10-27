// data/places/alleBaobab.js

export default {
    id: "tritriva",
    category: "Lieux",

    // 1. Fiche d’Aperçu (card sur l’écran “Découvrir”)
    preview: {
        image: require("../../assets/image/lac-tritriva.jpg"), // à adapter selon ton image
        title: "Lac Tritriva",
        tagline: "Le lac sacré aux mystères légendaires d'Antsirabe.",
        badge: "Lieux",
        shortInfo: "Lac volcanique, profond et teinté de légendes.",
    },

    // 2. Page de Détails
    details: {
        header: {
            bannerImage: require("../../assets/image/lac-tritriva.jpg"), // bannière principale
            title: "Lac Tritriva : Le Cratère des Amants Éternels",
            introduction:
                "Non loin d'Antsirabe, le Lac Tritriva est un site naturel d'une beauté sombre et mystérieuse. Ce lac volcanique, niché au fond d'un cratère, est célèbre non seulement pour ses eaux vert émeraude et sa profondeur insondable, mais surtout pour les légendes émouvantes qui l'entourent, faisant de lui un lieu sacré et chargé d'histoire.",
            makiMessage:
                "Maki te dit : \"As-tu déjà entendu parler d'un amour si fort qu'il traverse le temps ? Le Lac Tritriva est le témoin d'une histoire qui fait frissonner !\"",
        },

        identity: {
            localisation:
                "Région de Vakinankaratra (Hautes Terres Centrales). À environ 15 km à l'ouest d'Antsirabe.",
            meaning:
                'Tritriva" proviendrait du malgache pour "trois fois très" ou "très sacré',
            heritageType: "Site Naturel (Lac volcanique), Lieu de Légendes.",
            keySpecies:
                "Lac de cratère profond aux parois rocheuses verticales.",
        },

        focus: {
            title: "Histoires, Mystères et le Secret du Lac",
            content: [
                {
                    subtitle: "La Légende des Amants",
                    text: "Le Lac Tritriva est au cœur d'une tragique légende. Deux jeunes amoureux, Rabeniomby et Ravolahanta, dont l'union était interdite par leurs familles respectives, auraient choisi de se jeter main dans la main dans ses eaux profondes pour rester unis pour l'éternité. On dit que leurs âmes errent encore autour du lac.",
                },
                {
                    subtitle: "Un Mystère Étrange",
                    text: "La profondeur exacte du lac reste un mystère, mais on estime qu'elle dépasse les 100 mètres. Ce qui est encore plus curieux, c'est le niveau de l'eau : il baisse durant la saison des pluies et monte pendant la saison sèche, un phénomène qui défie la logique habituelle !",
                },
                {
                    subtitle: "Lieu Sacré",
                    text: "Les populations locales considèrent le lac comme sacré. Il est interdit d'y jeter des déchets, de nager à certains endroits ou de faire du bruit excessif, par respect pour les esprits et la pureté des lieux.",
                },
            ],
        },

        location: {
            title: "Où se trouve ce lac mythique ?",
            description:
                "Le Lac Tritriva est accessible par une piste depuis Antsirabe. C'est une excursion d'une demi-journée populaire.",
            mapImage: require("../../assets/image/Map-Tritriva.png"),
            visitTips:
                'Respectez la quiétude des lieux. Des guides locaux peuvent raconter les légendes et vous montrer les meilleurs points de vue, notamment les "yeux" (deux trous dans la roche à flanc de falaise).',
        },

        didYouKnow: {
            title: "Le Saviez-vous ?",
            image: require("../../assets/image/le-saviez-vous.png"), // image d’un pont suspendu ou d’un lémurien
            text: "Le Lac Tritriva est un baromètre inversé ! Son niveau d'eau monte en saison sèche et baisse en saison des pluies.",
            icon: "maki", // indique qu’on peut utiliser la tête de Maki comme icône à côté du titre
        },

        ending: {
            suggestion:
                "Les histoires d'amour et les mystères de Madagascar ne s'arrêtent jamais ! Apprends quelques mots pour exprimer l'étonnement ou la curiosité en malgache et découvre d'autres légendes.",
        },
    },
};
