import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation';

/**
 * Écran de détail d'une leçon avec contenu interactif
 * @param {Object} navigation - Objet de navigation React Navigation
 * @param {Object} route - Objet route contenant les paramètres
 */
const LessonDetail = ({ navigation, route }) => {
  // État pour suivre la progression de la leçon
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Données de la leçon "Salutations de base"
  const lessonData = {
    id: 1,
    title: 'Salutations de base',
    subtitle: 'Apprenez à dire bonjour et au revoir en malgache',
    steps: [
      {
        id: 1,
        type: 'introduction',
        title: 'Bienvenue dans cette leçon !',
        content: 'Dans cette leçon, vous allez apprendre les salutations de base en malgache. Prêt à commencer ?',
        image: require('./../assets/image/auth-vector.png'),
      },
      {
        id: 2,
        type: 'vocabulary',
        title: 'Salutations de base',
        content: [
          { malagasy: 'Tongasoa', french: 'Bonjour / Bienvenue', pronunciation: 'Tong-a-so-a' },
          { malagasy: 'Salama', french: 'Salut', pronunciation: 'Sa-la-ma' },
          { malagasy: 'Veloma', french: 'Au revoir', pronunciation: 'Ve-lo-ma' },
          { malagasy: 'Misaotra', french: 'Merci', pronunciation: 'Mi-sao-tra' },
        ],
      },
      {
        id: 3,
        type: 'quiz',
        title: 'Testez vos connaissances',
        questions: [
          {
            question: 'Comment dit-on "Bonjour" en malgache ?',
            options: ['Salama', 'Tongasoa', 'Veloma', 'Misaotra'],
            correct: 1,
          },
          {
            question: 'Que signifie "Veloma" ?',
            options: ['Bonjour', 'Merci', 'Au revoir', 'Salut'],
            correct: 2,
          },
          {
            question: 'Comment dit-on "Merci" en malgache ?',
            options: ['Tongasoa', 'Salama', 'Misaotra', 'Veloma'],
            correct: 2,
          },
        ],
      },
      {
        id: 4,
        type: 'practice',
        title: 'Pratiquez les salutations',
        content: 'Répétez après nous : Tongasoa, Salama, Veloma, Misaotra',
        audioHint: 'Cliquez pour écouter la prononciation',
      },
    ],
  };

  // Fonction pour passer à l'étape suivante
  const nextStep = () => {
    if (currentStep < lessonData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  // Fonction pour revenir à l'étape précédente
  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Fonction pour gérer les réponses du quiz
  const handleQuizAnswer = (questionIndex, selectedAnswer) => {
    const question = lessonData.steps[2].questions[questionIndex];
    if (selectedAnswer === question.correct) {
      setScore(score + 1);
      Alert.alert('Correct !', 'Bonne réponse ! 🎉');
    } else {
      Alert.alert('Incorrect', `La bonne réponse était : ${question.options[question.correct]}`);
    }
  };

  // Fonction pour recommencer la leçon
  const restartLesson = () => {
    setCurrentStep(0);
    setScore(0);
    setShowResults(false);
  };

  // Rendu de l'étape actuelle
  const renderCurrentStep = () => {
    const step = lessonData.steps[currentStep];

    switch (step.type) {
      case 'introduction':
        return (
          <View style={styles.stepContainer}>
            <Image source={step.image} style={styles.stepImage} />
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepContent}>{step.content}</Text>
            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.nextButtonText}>Commencer la leçon</Text>
            </TouchableOpacity>
          </View>
        );

      case 'vocabulary':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <ScrollView style={styles.vocabularyList}>
              {step.content.map((word, index) => (
                <View key={index} style={styles.vocabularyItem}>
                  <View style={styles.wordContainer}>
                    <Text style={styles.malagasyWord}>{word.malagasy}</Text>
                    <Text style={styles.frenchWord}>{word.french}</Text>
                    <Text style={styles.pronunciation}>{word.pronunciation}</Text>
                  </View>
                  <TouchableOpacity style={styles.audioButton}>
                    <Ionicons name="volume-high" size={24} color="#6CA94F" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.nextButtonText}>Continuer</Text>
            </TouchableOpacity>
          </View>
        );

      case 'quiz':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.quizProgress}>
              Question {currentStep - 1} sur {step.questions.length}
            </Text>
            <View style={styles.quizContainer}>
              {step.questions.map((question, qIndex) => (
                <View key={qIndex} style={styles.questionContainer}>
                  <Text style={styles.questionText}>{question.question}</Text>
                  {question.options.map((option, oIndex) => (
                    <TouchableOpacity
                      key={oIndex}
                      style={styles.optionButton}
                      onPress={() => handleQuizAnswer(qIndex, oIndex)}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.nextButtonText}>Voir les résultats</Text>
            </TouchableOpacity>
          </View>
        );

      case 'practice':
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepContent}>{step.content}</Text>
            <TouchableOpacity style={styles.audioButton}>
              <Ionicons name="play-circle" size={60} color="#6CA94F" />
            </TouchableOpacity>
            <Text style={styles.audioHint}>{step.audioHint}</Text>
            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.nextButtonText}>Terminer la leçon</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  // Rendu des résultats
  const renderResults = () => (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsTitle}>Félicitations ! 🎉</Text>
      <Text style={styles.resultsSubtitle}>Vous avez terminé la leçon</Text>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score : {score}/{lessonData.steps[2].questions.length}</Text>
        <Text style={styles.scorePercentage}>
          {Math.round((score / lessonData.steps[2].questions.length) * 100)}%
        </Text>
      </View>

      <View style={styles.resultsButtons}>
        <TouchableOpacity style={styles.restartButton} onPress={restartLesson}>
          <Text style={styles.restartButtonText}>Recommencer</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('lecon')}
        >
          <Text style={styles.backButtonText}>Retour aux leçons</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{lessonData.title}</Text>
          <Text style={styles.headerSubtitle}>{lessonData.subtitle}</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentStep + 1}/{lessonData.steps.length}
          </Text>
        </View>
      </View>

      {/* Barre de progression */}
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${((currentStep + 1) / lessonData.steps.length) * 100}%` }
          ]} 
        />
      </View>

      {/* Contenu principal */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {showResults ? renderResults() : renderCurrentStep()}
      </ScrollView>

      {/* Navigation fixe */}
      <BottomNavigation navigation={navigation} currentScreen="lecon" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#6CA94F',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6CA94F',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  stepImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  stepContent: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  vocabularyList: {
    marginBottom: 20,
  },
  vocabularyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  wordContainer: {
    flex: 1,
  },
  malagasyWord: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6CA94F',
    marginBottom: 5,
  },
  frenchWord: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 3,
  },
  pronunciation: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  audioButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizProgress: {
    fontSize: 16,
    color: '#6CA94F',
    textAlign: 'center',
    marginBottom: 20,
  },
  quizContainer: {
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  audioHint: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
  nextButton: {
    backgroundColor: '#6CA94F',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6CA94F',
    marginBottom: 10,
  },
  resultsSubtitle: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 30,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  scoreText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  scorePercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6CA94F',
  },
  resultsButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  restartButton: {
    backgroundColor: '#6CA94F',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  restartButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LessonDetail; 