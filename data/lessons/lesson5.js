export default {
  id: 5,
  title: "Les jours de la semaine",
  subtitle: "Apprenez à dire les jours en malgache",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Les jours de la semaine",
      content: "Dans cette leçon, vous apprendrez les jours de la semaine en malgache.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Jours de la semaine",
      content: [
        { malagasy: "Alatsinainy", french: "Lundi" },
        { malagasy: "Talata", french: "Mardi" },
        { malagasy: "Alarobia", french: "Mercredi" },
        { malagasy: "Alakamisy", french: "Jeudi" },
        { malagasy: "Zoma", french: "Vendredi" },
        { malagasy: "Asabotsy", french: "Samedi" },
        { malagasy: "Alahady", french: "Dimanche" },
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Quiz sur les jours",
      questions: [
        { question: "Comment dit-on 'Vendredi' en malgache ?", options: ["Zoma", "Alahady", "Talata", "Alarobia"], correct: 0 },
        { question: "Que signifie 'Alahady' ?", options: ["Samedi", "Dimanche", "Lundi", "Mardi"], correct: 1 },
      ],
    },
  ],
};
