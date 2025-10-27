export default {
  id: 2,
  title: "Les nombres",
  subtitle: "Apprenez à compter en malgache jusqu’à 10",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Compter en malgache",
      content: "Dans cette leçon, vous apprendrez à dire les chiffres de 1 à 10.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Les nombres de 1 à 10",
      content: [
        { malagasy: "Isa iray", french: "Un", pronunciation: "Isa i-ray" },
        { malagasy: "Roa", french: "Deux", pronunciation: "Ro-a" },
        { malagasy: "Telo", french: "Trois", pronunciation: "Te-lo" },
        { malagasy: "Efatra", french: "Quatre", pronunciation: "E-fa-tra" },
        { malagasy: "Dimy", french: "Cinq", pronunciation: "Di-my" },
        { malagasy: "Enina", french: "Six", pronunciation: "E-ni-na" },
        { malagasy: "Fito", french: "Sept", pronunciation: "Fi-to" },
        { malagasy: "Valo", french: "Huit", pronunciation: "Va-lo" },
        { malagasy: "Sivy", french: "Neuf", pronunciation: "Si-vy" },
        { malagasy: "Folo", french: "Dix", pronunciation: "Fo-lo" },
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Petit quiz sur les nombres",
      questions: [
        { question: "Comment dit-on '3' en malgache ?", options: ["Roa", "Telo", "Efatra", "Dimy"], correct: 1 },
        { question: "Que signifie 'Sivy' ?", options: ["Sept", "Neuf", "Huit", "Dix"], correct: 1 },
      ],
    },
  ],
};
