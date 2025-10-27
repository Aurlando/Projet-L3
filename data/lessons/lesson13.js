export default {
  id: 13,
  title: "La météo",
  subtitle: "Apprenez à parler du temps qu'il fait",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Parler de la météo",
      content: "Dans cette leçon, vous apprendrez à décrire le temps en malgache.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Vocabulaire météo",
      content: [
        { malagasy: "Arahaba", french: "Bonjour (formel)" },
        { malagasy: "Mandroso", french: "Ensoleillé" },
        { malagasy: "Orana", french: "Pluie" },
        { malagasy: "Rahona", french: "Nuage" },
        { malagasy: "Rivotra", french: "Vent" },
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Quiz sur la météo",
      questions: [
        { question: "Que signifie 'Orana' ?", options: ["Pluie", "Vent", "Nuage", "Ensoleillé"], correct: 0 },
        { question: "Comment dit-on 'Nuage' en malgache ?", options: ["Rahona", "Rivotra", "Mandroso", "Orana"], correct: 0 },
      ],
    },
  ],
};
