export default {
    id: 1,
    title: "Salutations de base",
    subtitle: "Apprenez à dire bonjour et au revoir en malgache",
    steps: [
        {
            id: 1,
            type: "introduction",
            title: "Bienvenue dans cette leçon !",
            content:
                "Dans cette leçon, vous allez apprendre les salutations de base en malgache. Prêt à commencer ?",
            image: require("../../assets/auth-vector.png"),
        },
        {
            id: 2,
            type: "vocabulary",
            title: "Salutations de base",
            content: [
                {
                    malagasy: "Tongasoa",
                    french: "Bonjour / Bienvenue",
                    pronunciation: "Tong-a-so-a",
                    audioFile: require("../../assets/vocaux/Tongasoa.m4a"), // Décommenter quand le fichier audio sera ajouté
                },
                {
                    malagasy: "Salama",
                    french: "Salut",
                    pronunciation: "Sa-la-ma",
                    audioFile: require("../../assets/vocaux/Salama.m4a") // Décommenter quand le fichier audio sera ajouté
                },
                {
                    malagasy: "Veloma",
                    french: "Au revoir",
                    pronunciation: "Ve-lo-ma",
                    audioFile: require("../../assets/vocaux/Veloma.m4a") // Décommenter quand le fichier audio sera ajouté
                },
                {
                    malagasy: "Misaotra",
                    french: "Merci",
                    pronunciation: "Mi-sao-tra",
                    audioFile: require("../../assets/vocaux/Misaotra.m4a") // Décommenter quand le fichier audio sera ajouté
                },
            ],
        },
        {
            id: 3,
            type: "quiz",
            title: "Testez vos connaissances",
            questions: [
                {
                    question: "Comment dit-on 'Bonjour' en malgache ?",
                    options: ["Tongasoa", "Salama", "Veloma", "Misaotra"],
                    correct: 1,
                },
                {
                    question: "Que signifie 'Veloma' ?",
                    options: ["Bonjour", "Merci", "Au revoir", "Salut"],
                    correct: 2,
                },
                {
                    question: "Comment dit-on 'Merci' en malgache ?",
                    options: ["Tongasoa", "Salama", "Misaotra", "Veloma"],
                    correct: 2,
                },
            ],
        },
        {
            id: 4,
            type: "practice",
            title: "Pratiquez les salutations",
            content: "Répétez après nous : Tongasoa, Salama, Veloma, Misaotra",
            audioHint: "Cliquez pour écouter la prononciation",
        },
    ],
};
