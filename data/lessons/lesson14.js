export default {
  id: 14,
  title: "Les verbes courants",
  subtitle: "Apprenez les verbes essentiels en malgache",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Verbes essentiels",
      content: "Cette leçon vous permettra d’apprendre les verbes les plus utilisés.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Verbes courants",
      content: [
        { malagasy: "Mihinana", french: "Manger" },
        { malagasy: "Misotro", french: "Boire" },
        { malagasy: "Matory", french: "Dormir" },
        { malagasy: "Mandeha", french: "Aller / Marcher" },
        { malagasy: "Manao", french: "Faire" },
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Quiz sur les verbes",
      questions: [
        { question: "Comment dit-on 'Dormir' en malgache ?", options: ["Matory", "Mandeha", "Manao", "Misotro"], correct: 0 },
        { question: "Que signifie 'Mihinana' ?", options: ["Manger", "Boire", "Aller", "Faire"], correct: 0 },
      ],
    },
  ],
};
