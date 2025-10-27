export default {
  id: 4,
  title: "Les couleurs",
  subtitle: "Apprenez à nommer les couleurs en malgache",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Découvrons les couleurs",
      content: "Dans cette leçon, vous allez apprendre les couleurs de base en malgache.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Couleurs de base",
      content: [
        { malagasy: "Mena", french: "Rouge" },
        { malagasy: "Mavo", french: "Jaune" },
        { malagasy: "Maitso", french: "Vert" },
        { malagasy: "Fotsy", french: "Blanc" },
        { malagasy: "Mainty", french: "Noir" },
        { malagasy: "Manga", french: "Bleu" },
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Quiz sur les couleurs",
      questions: [
        { question: "Que signifie 'Mena' ?", options: ["Rouge", "Vert", "Bleu", "Jaune"], correct: 0 },
        { question: "Comment dit-on 'Blanc' en malgache ?", options: ["Mena", "Fotsy", "Mavo", "Mainty"], correct: 1 },
        { question: "Que signifie 'Maitso' ?", options: ["Noir", "Vert", "Bleu", "Jaune"], correct: 1 },
      ],
    },
    {
      id: 4,
      type: "practice",
      title: "Pratique des couleurs",
      content: "Répétez après nous : Mena, Mavo, Maitso, Fotsy, Mainty, Manga",
      audioHint: "Cliquez pour écouter la prononciation",
    },
  ],
};
