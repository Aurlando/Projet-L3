export default {
  id: 10,
  title: "Les parties du corps",
  subtitle: "Apprenez à nommer les parties du corps en malgache",
  steps: [
    {
      id: 1,
      type: "introduction",
      title: "Le corps humain",
      content: "Dans cette leçon, vous allez apprendre le vocabulaire des parties du corps.",
      image: require("../../assets/auth-vector.png"),
    },
    {
      id: 2,
      type: "vocabulary",
      title: "Parties du corps",
      content: [
        { malagasy: "Loha", french: "Tête" },
        { malagasy: "Tanana", french: "Main / Bras" },
        { malagasy: "Tongotra", french: "Pied / Jambe" },
        { malagasy: "Maso", french: "Œil" },
        { malagasy: "Vava", french: "Bouche" },
        { malagasy: "Soa", french: "Santé / Bien-être" }, 
      ],
    },
    {
      id: 3,
      type: "quiz",
      title: "Quiz sur le corps",
      questions: [
        { question: "Que signifie 'Loha' ?", options: ["Tête", "Pied", "Main", "Œil"], correct: 0 },
        { question: "Comment dit-on 'Œil' en malgache ?", options: ["Vava", "Maso", "Tanana", "Loha"], correct: 1 },
      ],
    },
  ],
};
