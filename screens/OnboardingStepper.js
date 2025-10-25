import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Stepper from '../components/Stepper'; // ta barre de progression simple
import { useNavigation } from '@react-navigation/native';

export default function OnboardingStepper() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  // Assure-toi d'avoir 3 images dans assets/maki : maki1.png, maki2.png, maki3.png
  const makiImages = [
    require("../assets/choixObjectif.png"),
    require("../assets/choixDuree.png"),
     require("../assets/choixNiveau.png"),
  ];

  const steps = [
    {
      title: 'Choisis ton objectif',
      instruction: "Pourquoi veux-tu apprendre le malgache ? Sélectionne la raison principale.",
      options: ['Voyage à Madagascar', 'Apprendre pour le fun', 'Études / Travail', 'Autre'],
    },
    {
      title: "Durée d'apprentissage",
      instruction: "Combien de temps par jour veux-tu consacrer à l'apprentissage ?",
      options: ['5 min', '10 min', '20 min', '30+ min'],
    },
    {
      title: 'Ton niveau actuel',
      instruction: 'Quel est ton niveau de base en malgache ?',
      options: ['Débutant', 'Intermédiaire', 'Avancé'],
    },
  ];

  const selectedOption = answers[currentStep] ?? null;

  const handleSelect = (opt) => {
    setAnswers(prev => ({ ...prev, [currentStep]: opt }));
  };

  const handleNext = () => {
    if (!selectedOption) return; // sécurité
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      // Ici : sauvegarde dans Firestore / AsyncStorage si tu veux
      console.log('Onboarding answers:', answers);
      navigation.navigate('accueil'); // ou 'Home' selon ta route
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  return (
    <View style={styles.container}>
      {/* barre de progression */}
      <Stepper currentStep={currentStep} totalSteps={steps.length} />

      {/* Titre */}
      <Text style={styles.title}>Hiteny</Text>

      {/* Mascotte selon step */}
      <Image source={makiImages[Math.min(currentStep, makiImages.length - 1)]} style={styles.mascot} />

      {/* Contenu */}
      <View style={styles.content}>
        <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
        <Text style={styles.instruction}>{steps[currentStep].instruction}</Text>

        {steps[currentStep].options.map((opt, i) => {
          const isSelected = selectedOption === opt;
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.85}
              onPress={() => handleSelect(opt)}
              style={[styles.optionButton, isSelected && styles.optionSelected]}
            >
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer : Back à gauche / Next à droite */}
      <View style={styles.footer}>
        <View style={styles.left}>
          {currentStep > 0 && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backText}>Retour</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.right}>
          <TouchableOpacity
            onPress={handleNext}
            disabled={!selectedOption}
            style={[styles.nextButton, !selectedOption && styles.nextButtonDisabled]}
            activeOpacity={0.9}
          >
            <Text style={styles.nextText}>{currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 36,
  },
  title: {
    color: '#8BC34A',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  mascot: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom: 12,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  stepTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  instruction: {
    color: '#bdbdbd',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 18,
    paddingHorizontal: 12,
  },
  optionButton: {
    backgroundColor: '#111',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#222',
  },
  optionSelected: {
    backgroundColor: '#8BC34A',
    borderColor: '#8BC34A',
  },
  optionText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#000',
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 6,
  },
  left: { flex: 1, alignItems: 'flex-start' },
  right: { alignItems: 'flex-end' },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8BC34A',
  },
  backText: {
    color: '#8BC34A',
    fontWeight: '700',
  },
  nextButton: {
    backgroundColor: '#8BC34A',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  nextButtonDisabled: {
    opacity: 0.45,
  },
  nextText: {
    color: '#000',
    fontWeight: '700',
  },
});



    