export default {
  id: 6,
  title: "Les mois de l’année",
  subtitle: "Apprenez les mois en malgache",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Les mois",
      content: "Dans cette leçon, vous allez apprendre les mois de l'année en malgache.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Les mois de l’année",
      content: [
        { malagasy: "Janoary", french: "Janvier" },
        { malagasy: "Febroary", french: "Février" },
        { malagasy: "Martsa", french: "Mars" },
        { malagasy: "Aprily", french: "Avril" },
        { malagasy: "Mey", french: "Mai" },
        { malagasy: "Jona", french: "Juin" },
        { malagasy: "Jolay", french: "Juillet" },
        { malagasy: "Aogositra", french: "Août" },
        { malagasy: "Septambra", french: "Septembre" },
        { malagasy: "Oktobra", french: "Octobre" },
        { malagasy: "Novambra", french: "Novembre" },
        { malagasy: "Desambra", french: "Décembre" },
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Quiz sur les mois",
      questions: [
        { question: "Comment dit-on 'Mars' en malgache ?", options: ["Martsa", "Aprily", "Mey", "Jolay"], correct: 0 },
        { question: "Que signifie 'Desambra' ?", options: ["Décembre", "Novembre", "Octobre", "Août"], correct: 0 },
      ],
    },
  ],
};
