// data/places/alleBaobab.js

export default {
    id: "isalo",
    category: "Lieux",

    // 1. Fiche d’Aperçu (card sur l’écran “Découvrir”)
    preview: {
        image: require("../../assets/image/isalo-parc.jpg"), // à adapter selon ton image
        title: 'Le "Colorado malgache", sanctuaire des lémuriens Maki.',
        tagline: "Le paysage emblématique de l'Ouest malgache.",
        badge: "Lieux",
        shortInfo: "Massif ruiniforme de grès, canyons et piscines naturelles.",
    },

    // 2. Page de Détails
    details: {
        header: {
            bannerImage: require("../../assets/image/isalo-parc.jpg"), // bannière principale
            title: "Parc National de l'Isalo : Le Désert de Grès aux Oasis Secrètes",
            introduction:
                "Situé dans le sud de Madagascar, le Parc National de l'Isalo est un paysage digne d'un western. Cet immense massif de grès jurassique, sculpté par l'érosion, est surnommé le \"massif ruiniforme\". Il est caractérisé par des plateaux nus, des canyons profonds, des falaises vertigineuses et, contre toute attente, des oasis de fraîcheur abritant des piscines naturelles et une vie animale abondante, notamment des lémuriens.",
            makiMessage:
                'Maki te dit : "C\'est ma maison ici ! Tu verras partout mes cousins, les Makis (ou Lémurs catta), avec leurs longues queues rayées noir et blanc !"',
        },

        identity: {
            localisation:
                "Sud-Ouest de Madagascar, le long de la RN7. Près de Ranohira.",
            meaning:
                "Le mot Isalo n'a pas de traduction malgache directe claire, mais fait référence à la région.",
            heritageType: "Parc National, Patrimoine Géologique.",
            keySpecies:
                "Le Lémur Catta (Maki), les canyons de grès, et les sites funéraires Sakalava.",
        },

        focus: {
            title: "Histoires, Coutumes et Mystères du Massif",
            content: [
                {
                    subtitle: "Le Massif Ruiniforme",
                    text: "Les formations de grès ont été si fortement découpées par le vent et la pluie qu'elles prennent des formes étonnantes et très différentes (on peut y voir un crocodile, une tortue, ou même le profil d'une femme). C'est pourquoi les scientifiques parlent de \"massif ruiniforme\".",
                },
                {
                    subtitle: "Terre Sacrée des Baras",
                    text: "L'Isalo est le territoire du peuple Bara. Pour eux, le massif est une terre sacrée. Les défunts sont enterrés dans des grottes sur les flancs des falaises, un lieu où, selon leurs croyances, ils sont au plus proche des dieux. Il est d'usage de ne pas les pointer du doigt.",
                },
                {
                    subtitle: "L'Endémisme Amphibie",
                    text: "Malgré le climat semi-aride, le parc abrite une incroyable diversité d'amphibiens, dont plusieurs espèces qui n'existent nulle part ailleurs, comme la grenouille Mantella expectata, qui vit dans les quelques cours d'eau saisonniers.",
                },
            ],
        },

        location: {
            title: "Comment explorer ce désert ?",
            description:
                "Le parc s'étend sur plus de 81 000 hectares. L'entrée principale se situe près du village de Ranohira, sur la célèbre Route Nationale 7 (RN7).",
            mapImage: require("../../assets/image/Map-Isalo.png"),
            visitTips:
                "Les deux circuits les plus célèbres sont la Piscine Naturelle (facile) et le Canyon des Lémuriens (modéré). Emportez toujours beaucoup d'eau, car le soleil est intense.",
        },

        didYouKnow: {
            title: "Le Saviez-vous ?",
            image: require("../../assets/image/le-saviez-vous.png"), // image d’un pont suspendu ou d’un lémurien
            text: "L'Isalo abrite des amphibiens dans un environnement désertique ! Ces grenouilles ont développé des adaptations uniques pour survivre dans ce climat aride.",
            icon: "maki", // indique qu’on peut utiliser la tête de Maki comme icône à côté du titre
        },

        ending: {
            suggestion:
                "Le Maki est l'emblème de l'Isalo ! Apprends la leçon sur les animaux de Madagascar pour découvrir les différents types de lémuriens qui vivent ici et dans le reste de l'île.",
        },
    },
};
