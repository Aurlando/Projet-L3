import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { lessonsData } from "../data/lessons/lessonsData";
import { auth, db } from "./locales/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const LessonDetail = ({ navigation, route }) => {
  const { lessonId } = route.params;
  const lessonData = lessonsData.find((lesson) => lesson.id === lessonId);

  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  if (!lessonData) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Leçon introuvable.</Text>
      </View>
    );
  }

  const step = lessonData.steps[currentStep];
  const isQuizStep = step.type === "quiz";

  const handleNext = () => {
    if (isQuizStep && currentQuestion < step.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowQuizResult(false);
      setHasAnswered(false);
    } else if (isQuizStep && currentQuestion === step.questions.length - 1) {
      // Dernière question du quiz
      calculateFinalScore();
      setShowFinalResults(true);
    } else if (currentStep < lessonData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentQuestion(0);
      setShowQuizResult(false);
      setHasAnswered(false);
    } else {
      setShowFinalResults(true);
    }
  };

  const handleAnswer = (answerIndex) => {
    if (showQuizResult || hasAnswered) return; // Empêcher les réponses multiples
    
    const question = step.questions[currentQuestion];
    const isCorrect = answerIndex === question.correct;
    
    setSelectedAnswers(prev => [...prev, { questionIndex: currentQuestion, answerIndex, isCorrect }]);
    setShowQuizResult(true);
    setHasAnswered(true);
  };

  const calculateFinalScore = () => {
    const quizStep = lessonData.steps.find(s => s.type === "quiz");
    if (quizStep) {
      let totalScore = 0;
      quizStep.questions.forEach((q, i) => {
        const userAnswer = selectedAnswers.find(a => a.questionIndex === i);
        if (userAnswer && userAnswer.isCorrect) {
          totalScore++;
        }
      });
      saveProgress(totalScore, quizStep.questions.length);
    }
  };

  const saveProgress = async (correctAnswers, totalQuestions) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        const completedLessons = data.completedLessons || [];
        const unlockedLessons = data.unlockedLessons || [1];
        
        // Marquer cette leçon comme complétée si le score est au moins 60%
        if ((correctAnswers / totalQuestions) >= 0.6 && !completedLessons.includes(lessonId)) {
          const newUnlockedId = lessonId + 1;
          const updatedCompletedLessons = [...completedLessons, lessonId];
          const updatedUnlockedLessons = [...new Set([...unlockedLessons, newUnlockedId])];
          
          await updateDoc(userRef, {
            completedLessons: updatedCompletedLessons,
            unlockedLessons: updatedUnlockedLessons,
          });
          
          // Afficher l'alerte après un court délai pour que l'UI soit mise à jour
          setTimeout(() => {
            Alert.alert("Bravo 🎉", "Tu as complété cette leçon et débloqué la suivante !");
          }, 500);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    }
  };

  const handleFinishLesson = () => {
    navigation.navigate("lecon", { completedLessonId: lessonId });
  };

  const renderStep = () => {
    if (step.type === "introduction") {
      return (
        <View style={styles.introContainer}>
          <Image source={require("../assets/lemurien.png")} style={styles.lemurImage} />
          <Text style={styles.introTitle}>{step.title}</Text>
          <Text style={styles.introContent}>{step.content}</Text>
        </View>
      );
    }

    if (step.type === "vocabulary") {
      return (
        <View style={styles.vocabContainer}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          {step.content.map((word, i) => (
            <View key={i} style={styles.vocabCard}>
              <View style={styles.vocabContent}>
                <Text style={styles.malagasyWord}>{word.malagasy}</Text>
                <Text style={styles.frenchWord}>{word.french}</Text>
                {word.pronunciation && (
                  <Text style={styles.pronunciation}>{word.pronunciation}</Text>
                )}
              </View>
              <Ionicons name="volume-high" size={24} color="#4CAF50" />
            </View>
          ))}
        </View>
      );
    }

    if (step.type === "quiz") {
      const question = step.questions[currentQuestion];
      const selectedAnswer = selectedAnswers.find(a => a.questionIndex === currentQuestion);
      const totalQuestions = step.questions.length;
      const currentQuestionNum = currentQuestion + 1;

      return (
        <View style={styles.quizContainer}>
          <Text style={styles.quizTitle}>Testez vos connaissances</Text>
          <Text style={styles.questionCounter}>Question {currentQuestionNum} sur {totalQuestions}</Text>
          <Text style={styles.questionText}>{question.question}</Text>
          
          {question.options.map((opt, j) => {
            const isSelected = selectedAnswer && selectedAnswer.answerIndex === j;
            const isCorrect = j === question.correct;
            
            return (
                <TouchableOpacity
                  key={j}
                style={[
                  styles.optionButton,
                  isSelected && isCorrect && styles.correctOption,
                  isSelected && !isCorrect && styles.incorrectOption,
                  showQuizResult && j === question.correct && styles.correctOption,
                ]}
                onPress={() => handleAnswer(j)}
                disabled={showQuizResult || hasAnswered}
              >
                <Text style={styles.optionText}>{opt}</Text>
                </TouchableOpacity>
            );
          })}
          
          {showQuizResult && (
            <Text style={styles.feedbackText}>
              {selectedAnswer?.isCorrect ? "Bonne réponse !" : "Mauvaise réponse"}
            </Text>
          )}
          
          {showQuizResult && (
            <Text style={styles.currentScore}>
              Score actuel : {selectedAnswers.filter(a => a.isCorrect).length}/{currentQuestionNum}
            </Text>
          )}
            </View>
      );
    }

    if (step.type === "practice") {
      return (
        <View style={styles.practiceContainer}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.practiceContent}>{step.content}</Text>
          {step.audioHint && (
            <Text style={styles.audioHint}>{step.audioHint}</Text>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.lessonTitle}>{lessonData.title}</Text>
          <Text style={styles.lessonSubtitle}>{lessonData.subtitle}</Text>
        </View>
        <Text style={styles.progressText}>{currentStep + 1}/{lessonData.steps.length}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${((currentStep + 1) / lessonData.steps.length) * 100}%` }]} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderStep()}
      </ScrollView>

      {/* Navigation Button */}
      {showFinalResults ? (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Leçon terminée !</Text>
          <Text style={styles.resultsScore}>
            Score final : {selectedAnswers.filter(a => a.isCorrect).length}/{lessonData.steps.find(s => s.type === "quiz")?.questions.length || 0}
          </Text>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinishLesson}>
            <Text style={styles.finishButtonText}>Retour aux leçons</Text>
          </TouchableOpacity>
        </View>
      ) : isQuizStep && showQuizResult ? (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentQuestion === step.questions.length - 1 ? "Voir les résultats" : "Question suivante"}
          </Text>
        </TouchableOpacity>
      ) : !isQuizStep ? (
        <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
          <Text style={styles.continueButtonText}>
            {currentStep === 0 ? "Commencer la leçon" : "Continuer"}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
    marginLeft: 10,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  lessonSubtitle: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#2A2A2A",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 2,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  introContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  lemurImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  introContent: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 24,
  },
  vocabContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  vocabCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vocabContent: {
    flex: 1,
  },
  malagasyWord: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  frenchWord: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 4,
  },
  pronunciation: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
  quizContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  questionCounter: {
    fontSize: 16,
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  correctOption: {
    backgroundColor: "#4CAF50",
  },
  incorrectOption: {
    backgroundColor: "#D32F2F",
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  currentScore: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  practiceContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  practiceContent: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 24,
    marginBottom: 10,
  },
  audioHint: {
    fontSize: 14,
    color: "#888",
    marginTop: 10,
  },
  continueButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  resultsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  resultsScore: {
    fontSize: 18,
    color: "#4CAF50",
    marginBottom: 20,
  },
  finishButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default LessonDetail;
