export default {
  id: 11,
  title: "Les vêtements",
  subtitle: "Apprenez le vocabulaire des vêtements en malgache",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Les vêtements",
      content: "Dans cette leçon, vous allez apprendre les mots pour différents vêtements.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Vêtements courants",
      content: [
        { malagasy: "Lamba", french: "Vêtement / Tissu" },
        { malagasy: "T-shirt", french: "T-shirt" },
        { malagasy: "Pataloha", french: "Pantalon" },
        { malagasy: "Kiraro", french: "Chaussures" },
        { malagasy: "Satroka", french: "Chapeau" },
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Quiz sur les vêtements",
      questions: [
        { question: "Que signifie 'Kiraro' ?", options: ["Chapeau", "Chaussures", "T-shirt", "Pantalon"], correct: 1 },
        { question: "Comment dit-on 'Chapeau' en malgache ?", options: ["Satroka", "Lamba", "T-shirt", "Pataloha"], correct: 0 },
      ],
    },
  ],
};
