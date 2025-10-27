export default {
  id: 7,
  title: "La famille",
  subtitle: "Apprenez à nommer les membres de la famille en malgache",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Membres de la famille",
      content: "Dans cette leçon, vous allez apprendre les mots de la famille en malgache.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Vocabulaire familial",
      content: [
        { malagasy: "Ray", french: "Père" },
        { malagasy: "Reny", french: "Mère" },
        { malagasy: "Zanaka", french: "Enfant" },
        { malagasy: "Rahalahy", french: "Frère" },
        { malagasy: "Anabavy", french: "Sœur" },
        { malagasy: "Dada", french: "Grand-père" },
        { malagasy: "Neny", french: "Grand-mère" },
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Quiz sur la famille",
      questions: [
        { question: "Comment dit-on 'Mère' en malgache ?", options: ["Reny", "Ray", "Zanaka", "Anabavy"], correct: 0 },
        { question: "Que signifie 'Rahalahy' ?", options: ["Sœur", "Frère", "Grand-père", "Enfant"], correct: 1 },
        { question: "Comment dit-on 'Grand-mère' ?", options: ["Dada", "Neny", "Reny", "Ray"], correct: 1 },
      ],
    },
  ],
};
