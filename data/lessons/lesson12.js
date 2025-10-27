export default {
  id: 12,
  title: "Les transports",
  subtitle: "Apprenez les moyens de transport en malgache",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Transports",
      content: "Dans cette leçon, vous apprendrez les mots pour différents moyens de transport.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Moyens de transport",
      content: [
        { malagasy: "Fiara", french: "Voiture" },
        { malagasy: "Bis", french: "Bus" },
        { malagasy: "Fiaramanidina", french: "Avion" },
        { malagasy: "Lamasinina", french: "Train" },
        { malagasy: "Bato-bato", french: "Bateau" },
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Quiz sur les transports",
      questions: [
        { question: "Comment dit-on 'Bus' en malgache ?", options: ["Fiara", "Bis", "Lamasinina", "Fiaramanidina"], correct: 1 },
        { question: "Que signifie 'Fiaramanidina' ?", options: ["Train", "Voiture", "Avion", "Bateau"], correct: 2 },
      ],
    },
  ],
};
