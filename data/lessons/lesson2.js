export default {
    id: 2,
    title: "Les nombres",
    subtitle: "Apprenez à compter en malgache jusqu’à 10",
    steps: [
        {
            id: 1,
            type: "introduction",
            title: "Compter en malgache",
            content:
                "Dans cette leçon, vous apprendrez à dire les chiffres de 1 à 10.",
            image: require("../../assets/auth-vector.png"),
        },
        {
            id: 2,
            type: "vocabulary",
            title: "Les nombres de 1 à 10",
            content: [
                {
                    malagasy: "Isa/iray",
                    french: "Un",
                    pronunciation: "Isa i-ray",
                    audioFile: require("../../assets/vocaux/Isa.m4a"),
                },
                { malagasy: "Roa", french: "Deux", pronunciation: "Ro-a", audioFile: require("../../assets/vocaux/Roa.m4a") },
                { malagasy: "Telo", french: "Trois", pronunciation: "Te-lo", audioFile: require("../../assets/vocaux/Telo.m4a") },
                {
                    malagasy: "Efatra",
                    french: "Quatre",
                    pronunciation: "E-fa-tra",
                    audioFile: require("../../assets/vocaux/Efatra.m4a"),
                },
                { malagasy: "Dimy", french: "Cinq", pronunciation: "Di-my", audioFile: require("../../assets/vocaux/Dimy.m4a") },
                { malagasy: "Enina", french: "Six", pronunciation: "E-ni-na", audioFile: require("../../assets/vocaux/Enina.m4a") },
                { malagasy: "Fito", french: "Sept", pronunciation: "Fi-to", audioFile: require("../../assets/vocaux/Fito.m4a") },
                { malagasy: "Valo", french: "Huit", pronunciation: "Va-lo", audioFile: require("../../assets/vocaux/Valo.m4a") },
                { malagasy: "Sivy", french: "Neuf", pronunciation: "Si-vy", audioFile: require("../../assets/vocaux/Sivy.m4a") },
                { malagasy: "Folo", french: "Dix", pronunciation: "Fo-lo",  audioFile: require("../../assets/vocaux/Folo.m4a") },
            ],
        },
        {
            id: 3,
            type: "quiz",
            title: "Petit quiz sur les nombres",
            questions: [
                {
                    question: "Comment dit-on '3' en malgache ?",
                    options: ["Roa", "Telo", "Efatra", "Dimy"],
                    correct: 1,
                },
                {
                    question: "Que signifie 'Sivy' ?",
                    options: ["Sept", "Neuf", "Huit", "Dix"],
                    correct: 1,
                },
            ],
        },
    ],
};
