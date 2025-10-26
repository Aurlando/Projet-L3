export default {
  id: 3,
  title: "Les expressions courantes",
  subtitle: "Apprenez à saluer et remercier poliment",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Expressions du quotidien",
      content: "Quelques expressions utiles pour être poli et amical.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Expressions utiles",
      content: [
        { malagasy: "Manahoana", french: "Bonjour (formel)" },
        { malagasy: "Manao ahoana ianao ?", french: "Comment allez-vous ?" },
        { malagasy: "Tsara be", french: "Très bien" },
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Test de compréhension",
      questions: [
        { question: "Que signifie 'Manahoana' ?", options: ["Bonjour", "Merci", "Au revoir"], correct: 0 },
      ],
    },
  ],
};
