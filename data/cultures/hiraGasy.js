export default {
    id: "hiraGasy",
    category: "Culture",

    // 1. Fiche d'Aperçu (card sur l'écran "Découvrir")
    preview: {
        image: require("../../assets/image/hiragasy.jpg"), // Le placeholder existe déjà
        title: "Le Hira Gasy",
        tagline: "Le spectacle total des Hauts-Plateaux : musique, théâtre et débat civique.",
        badge: "Culture",
        shortInfo: "Art traditionnel mêlant chant, danse et éloquence.",
    },

    // 2. Page de Détails
    details: {
        header: {
            bannerImage: require("../../assets/image/hiragasy.jpg"),
            title: "Le Hira Gasy : Le Théâtre Chanté et l'École de l'Éloquence",
            introduction:
                "Le Hira Gasy, littéralement 'chant malgache', est une forme d'art populaire originaire des Hauts-Plateaux. C'est un véritable opéra rural mêlant chant, danse, musique et art oratoire. Pendant des heures, les troupes s'affrontent sur des thèmes sociaux ou historiques.",
            makiMessage:
                "Maki te dit : 'Dans un spectacle de Hira Gasy, il n'y a pas de pause ! Les artistes jouent souvent du matin jusqu'au coucher du soleil !'",
        },

        identity: {
            localisation: "Hauts-Plateaux (Antananarivo, Antsirabe).",
            meaning: "Art d'éducation morale, civique et oratoire.",
            heritageType: "Art Vivant, Patrimoine Immatériel.",
            keyElement: "Le Kabary (discours fleuri) et les joutes oratoires.",
        },

        focus: {
            title: "Histoires, Traditions et Héritage Royal",
            content: [
                {
                    subtitle: "L'Art du Kabary",
                    text: "Le Kabary est un discours fleuri et codifié, où l'orateur utilise des proverbes, des métaphores et des expressions imagées pour transmettre des messages profonds. C'est une véritable école de l'éloquence où le public apprend autant que les participants.",
                },
                {
                    subtitle: "Les Compétitions de Troupes",
                    text: "Les troupes s'affrontent lors de compétitions où la virtuosité musicale et oratoire est mise à l'épreuve. Chaque troupe prépare des spectacles autour de thèmes comme l'amour, la politique, l'histoire ou la morale.",
                },
                {
                    subtitle: "Un Héritage Royal",
                    text: "Le Hira Gasy est né dans la cour royale Merina comme moyen d'éducation et de divertissement pour la noblesse. Aujourd'hui, il a gagné toutes les couches de la société et reste un moyen de transmission culturelle essentiel.",
                },
            ],
        },

        location: {
            title: "Quand et où voir le Hira Gasy ?",
            description:
                "Les meilleures représentations ont lieu dans les villages des Hauts-Plateaux lors d'événements traditionnels (circoncisions, mariages, fêtes). Les spectacles se déroulent en plein air et durent parfois toute la journée.",
            visitTips:
                "Même sans comprendre tous les mots, on ressent la puissance oratoire et la passion du rythme. Les gestes, les expressions et la musique parlent leur propre langue.",
        },

        ending: {
            suggestion:
                "Le Hira Gasy montre la puissance des mots en Malgache. Entraîne-toi à utiliser des proverbes dans nos leçons pour impressionner ton prochain interlocuteur !",
        },
    },
};

