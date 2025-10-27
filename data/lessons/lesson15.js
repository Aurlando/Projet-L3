export default {
  id: 15,
  title: "Les émotions",
  subtitle: "Apprenez à exprimer vos émotions en malgache",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Exprimer ses émotions",
      content: "Dans cette leçon, vous apprendrez le vocabulaire des émotions courantes.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Émotions",
      content: [
        { malagasy: "Faly", french: "Heureux" },
        { malagasy: "Malahelo", french: "Triste" },
        { malagasy: "Tezitra", french: "En colère" },
        { malagasy: "Mahatsiaro", french: "Ému / Touché" },
        { malagasy: "Mampalahelo", french: "Décevant / Désolé" },
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Quiz sur les émotions",
      questions: [
        { question: "Que signifie 'Faly' ?", options: ["Triste", "Heureux", "En colère", "Ému"], correct: 1 },
        { question: "Comment dit-on 'En colère' en malgache ?", options: ["Tezitra", "Malahelo", "Faly", "Mahatsiaro"], correct: 0 },
      ],
    },
  ],
};
