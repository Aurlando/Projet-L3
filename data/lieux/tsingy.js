// data/places/tsingy.js

export default {
    id: "tsingy",
    category: "Lieux",

    // 1. Fiche d’Aperçu (card sur l’écran “Découvrir”)
    preview: {
        image: require("../../assets/image/tsingy-bemaraha.jpg"), // à adapter selon ton image
        title: "Les Tsingy de Bemaraha",
        tagline: 'La "forêt de pierre" de Madagascar, classée à l’UNESCO.',
        badge: "Lieux",
        shortInfo: "Labyrinthe karstique unique au monde.",
    },

    // 2. Page de Détails
    details: {
        header: {
            bannerImage: require("../../assets/image/tsingy-bemaraha.jpg"), // bannière principale
            title: "Les Tsingy de Bemaraha : Le Labyrinthe de Pierre Aiguisée",
            introduction:
                'Situé dans l’Ouest de Madagascar, ce parc national est une merveille géologique unique au monde. Il est célèbre pour ses formations calcaires spectaculaires, érodées par la pluie et le temps pour former une immense "forêt" de pointes acérées. Classé au patrimoine mondial de l’UNESCO, le site est un refuge pour une biodiversité exceptionnelle.',
            makiMessage:
                "Maki te dit : \"Fais attention où tu marches ! Le nom Tsingy vient du malgache mitsingitsingy, qui veut dire 'marcher sur la pointe des pieds' ou 'y aller avec crainte' !\"",
        },

        identity: {
            localisation:
                "Région de Melaky (Ouest). Près de la ville de Bekopaka.",
            meaning: 'Tsingy : "Là où l’on ne peut marcher pieds nus".',
            heritageType: "Parc National et Réserve Naturelle Intégrale.",
            keySpecies:
                "Le Sifaka de Decken (un lémurien entièrement blanc) et le Fosa (le prédateur local).",
        },

        focus: {
            title: "Histoires, Mystères et Faune Secrète",
            content: [
                {
                    subtitle: "L’Âge Géologique",
                    text: "Ces formations sont d’anciens dépôts de calcaire datant de 200 millions d’années, soulevés par la tectonique. L’érosion par les pluies tropicales les a sculptés en cathédrales de pierre pouvant atteindre 100 mètres de haut.",
                },
                {
                    subtitle: "Un Sanctuaire Secret",
                    text: "Les crevasses et les canyons profonds créés par les Tsingy forment des micro-écosystèmes isolés. Cela a permis à des espèces végétales et animales d’évoluer de manière unique, ce qui rend la biodiversité du site particulièrement riche.",
                },
                {
                    subtitle: "Les Abris des Vazimba",
                    text: "Les grottes et les cavités souterraines des Tsingy servaient d’abri et de lieux de sépulture aux Vazimba, considérés comme les premiers habitants mystiques de Madagascar. Le site conserve donc une grande importance culturelle et sacrée.",
                },
            ],
        },

        location: {
            title: "Où se trouve ce massif calcaire ?",
            description:
                'Le site est divisé en "Petits Tsingy" (plus accessibles) et "Grands Tsingy" (pour les randonneurs aguerris, via des ponts suspendus et via ferrata).',
            mapImage: require("../../assets/image/Map-Tsingy.png"),
            visitTips:
                "La saison idéale pour visiter est la saison sèche (de Juin à Novembre). Durant la saison des pluies, les routes d’accès sont souvent impraticables.",
        },

        didYouKnow: {
            title: "Le Saviez-vous ?",
            image: require("../../assets/image/le-saviez-vous.png"), // image d’un pont suspendu ou d’un lémurien
            text: "Les Tsingy abritent des grottes où des fossiles d'espèces disparues ont été retrouvés, témoins de l’évolution unique de Madagascar !",
            icon: "maki", // indique qu’on peut utiliser la tête de Maki comme icône à côté du titre
        },

        ending: {
            suggestion:
                "Les Tsingy exigent agilité et courage ! Apprends le vocabulaire malgache lié à l’aventure et à la nature pour être prêt à explorer ces merveilles.",
        },
    },
};
