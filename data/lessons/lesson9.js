export default {
  id: 9,
  title: "Les animaux",
  subtitle: "Apprenez les noms d'animaux en malgache",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Animaux",
      content: "Dans cette leçon, vous allez apprendre à nommer différents animaux.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Vocabulaire animalier",
      content: [
        { malagasy: "Alika", french: "Chien" },
        { malagasy: "Saka", french: "Chat" },
        { malagasy: "Omby", french: "Vache" },
        { malagasy: "Akoho", french: "Poulet" },
        { malagasy: "Soavaly", french: "Cheval" },
        { malagasy: "Rano", french: "Poisson" }, // pour simplifier, poisson = Rano (dans le contexte alimentaire) 
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Quiz sur les animaux",
      questions: [
        { question: "Comment dit-on 'Chat' en malgache ?", options: ["Alika", "Saka", "Omby", "Akoho"], correct: 1 },
        { question: "Que signifie 'Soavaly' ?", options: ["Cheval", "Chien", "Poulet", "Vache"], correct: 0 },
      ],
    },
  ],
};
