import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

/**
 * Composant bouton de prononciation réutilisable
 * @param {Object} props
 * @param {string} props.audioFile - Chemin vers le fichier audio (optionnel)
 * @param {number} props.size - Taille de l'icône (défaut: 24)
 * @param {string} props.color - Couleur de l'icône (défaut: "#4CAF50")
 * @param {Function} props.onPress - Callback optionnel
 */
const PronunciationButton = ({ audioFile, size = 24, color = "#4CAF50", onPress }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Nettoyer le son quand le composant se démonte
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  /**
   * Charge et joue le fichier audio
   */
  const handlePlayAudio = async () => {
    if (!audioFile) {
      console.warn('Aucun fichier audio fourni');
      return;
    }

    // Si un son est déjà en cours de lecture, l'arrêter
    if (isPlaying && sound) {
      try {
        await sound.stopAsync();
        setIsPlaying(false);
      } catch (error) {
        console.error('Erreur lors de l\'arrêt du son:', error);
      }
      return;
    }

    try {
      setIsLoading(true);
      
      // Charger le fichier audio
      const { sound: soundObject } = await Audio.Sound.createAsync(
        audioFile,
        { shouldPlay: false }
      );
      
      setSound(soundObject);

      // Écouter les événements de fin de lecture
      soundObject.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });

      // Jouer le son
      await soundObject.playAsync();
      setIsPlaying(true);
      setIsLoading(false);

      // Appeler le callback si fourni
      if (onPress) {
        onPress();
      }
    } catch (error) {
      console.error('Erreur lors de la lecture audio:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  // Si aucun fichier audio n'est fourni, afficher l'icône grisée
  if (!audioFile) {
    return (
      <Ionicons 
        name="volume-high-outline" 
        size={size} 
        color="#888" 
      />
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePlayAudio}
      disabled={isLoading}
      style={{ opacity: isLoading ? 0.5 : 1 }}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <Ionicons 
          name={isPlaying ? "volume-high" : "volume-high-outline"} 
          size={size} 
          color={color} 
        />
      )}
    </TouchableOpacity>
  );
};

export default PronunciationButton;

