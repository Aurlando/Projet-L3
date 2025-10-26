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
        { malagasy: "Isa iray", french: "Un" },
        { malagasy: "Roa", french: "Deux" },
        { malagasy: "Telo", french: "Trois" },
        { malagasy: "Efatra", french: "Quatre" },
        { malagasy: "Dimy", french: "Cinq" },
        { malagasy: "Enina", french: "Six" },
        { malagasy: "Fito", french: "Sept" },
        { malagasy: "Valo", french: "Huit" },
        { malagasy: "Sivy", french: "Neuf" },
        { malagasy: "Folo", french: "Dix" },
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
