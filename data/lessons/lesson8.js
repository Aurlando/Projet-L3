export default {
  id: 8,
  title: "Les aliments",
  subtitle: "Apprenez le vocabulaire de la nourriture en malgache",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Les aliments",
      content: "Dans cette leçon, vous apprendrez le vocabulaire de la nourriture et des boissons.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Vocabulaire alimentaire",
      content: [
        { malagasy: "Mofo", french: "Pain" },
        { malagasy: "Vary", french: "Riz" },
        { malagasy: "Hena", french: "Viande" },
        { malagasy: "Trondro", french: "Poisson" },
        { malagasy: "Voankazo", french: "Fruits" },
        { malagasy: "Legioma", french: "Légumes" },
        { malagasy: "Rano", french: "Eau" },
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Quiz sur les aliments",
      questions: [
        { question: "Que signifie 'Mofo' ?", options: ["Pain", "Riz", "Viande", "Poisson"], correct: 0 },
        { question: "Comment dit-on 'Fruits' en malgache ?", options: ["Voankazo", "Legioma", "Vary", "Hena"], correct: 0 },
        { question: "Que signifie 'Rano' ?", options: ["Jus", "Lait", "Eau", "Thé"], correct: 2 },
      ],
    },
  ],
};
