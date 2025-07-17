import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Clock, Lock, Play, Check, RotateCcw } from 'lucide-react-native';
import BottomNavigation from '../components/BottomNavigation';
import { useTheme } from '../hooks/useTheme';

const lessons = [
  {
    id: 1,
    title: 'Salutations de base',
    subtitle: 'Apprenez à dire bonjour et au revoir',
    difficulty: 'Débutant',
    duration: '10 min',
    status: 'completed',
    progress: 100,
    words: ['Tongasoa', 'Veloma', 'Misaotra'],
  },
  {
    id: 2,
    title: 'Membres de la famille',
    subtitle: 'Vocabulaire des relations familiales',
    difficulty: 'Débutant',
    duration: '15 min',
    status: 'completed',
    progress: 100,
    words: ['Ray', 'Reny', 'Rahalahy'],
  },
  {
    id: 3,
    title: 'Nombres 1-20',
    subtitle: 'Compter de un à vingt',
    difficulty: 'Débutant',
    duration: '12 min',
    status: 'in_progress',
    progress: 60,
    words: ['Iray', 'Roa', 'Telo'],
  },
  {
    id: 4,
    title: 'Verbes courants',
    subtitle: 'Mots d\'action essentiels',
    difficulty: 'Intermédiaire',
    duration: '20 min',
    status: 'available',
    progress: 0,
    words: ['Mandeha', 'Mihinana', 'Misotro'],
  },
  {
    id: 5,
    title: 'Nourriture et boissons',
    subtitle: 'Vocabulaire des repas et boissons',
    difficulty: 'Intermédiaire',
    duration: '18 min',
    status: 'locked',
    progress: 0,
    words: ['Vary', 'Hena', 'Rano'],
  },
  {
    id: 6,
    title: 'Couleurs et formes',
    subtitle: 'Décrire les objets visuellement',
    difficulty: 'Débutant',
    duration: '14 min',
    status: 'locked',
    progress: 0,
    words: ['Mena', 'Fotsy', 'Mainty'],
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Débutant':
      return '#4CAF50';
    case 'Intermédiaire':
      return '#FF9800';
    case 'Avancé':
      return '#F44336';
    default:
      return '#999';
  }
};

const getButtonConfig = (status) => {
  switch (status) {
    case 'completed':
      return {
        text: 'Réviser',
        color: '#2196F3',
        icon: RotateCcw,
        disabled: false,
      };
    case 'in_progress':
      return {
        text: 'Continuer',
        color: '#4CAF50',
        icon: Play,
        disabled: false,
      };
    case 'available':
      return {
        text: 'Commencer',
        color: '#4CAF50',
        icon: Play,
        disabled: false,
      };
    case 'locked':
      return {
        text: 'Verrouillé',
        color: '#999',
        icon: Lock,
        disabled: true,
      };
    default:
      return {
        text: 'Commencer',
        color: '#4CAF50',
        icon: Play,
        disabled: false,
      };
  }
};

const Lecon = ({ navigation }) => {
  const { theme } = useTheme(); // Hook pour le thème global
  const titleColor = theme === 'dark' ? '#fff' : '#222';
  const sectionLabelColor = theme === 'dark' ? '#fff' : '#222';

  // Fonction pour gérer les actions des boutons de leçons
  const handleLessonAction = (lesson, action) => {
    switch (action) {
      case 'Commencer':
        // Démarrer une nouvelle leçon
        console.log(`Démarrage de la leçon: ${lesson.title}`);
        navigation.navigate('lessonDetail', { lessonId: lesson.id });
        break;
      case 'Continuer':
        // Continuer une leçon en cours
        console.log(`Reprendre la leçon: ${lesson.title} (${lesson.progress}% terminé)`);
        navigation.navigate('lessonDetail', { lessonId: lesson.id, progress: lesson.progress });
        break;
      case 'Réviser':
        // Réviser une leçon terminée
        console.log(`Révision de la leçon: ${lesson.title}`);
        navigation.navigate('lessonDetail', { lessonId: lesson.id, mode: 'review' });
        break;
      default:
        console.log(`Action non reconnue: ${action} pour la leçon ${lesson.id}`);
    }
  };

  const renderLessonCard = (lesson) => {
    const buttonConfig = getButtonConfig(lesson.status);
    const ButtonIcon = buttonConfig.icon;

    return (
      <View key={lesson.id} style={[
        styles.lessonCard,
        lesson.status === 'locked' && styles.lockedCard
      ]}>
        <View style={styles.cardHeader}>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>
            
            <View style={styles.lessonMeta}>
              <View style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(lesson.difficulty) }
              ]}>
                <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
              </View>
              
              <View style={styles.durationContainer}>
                <Clock size={14} color="#666" />
                <Text style={styles.durationText}>{lesson.duration}</Text>
              </View>
            </View>
          </View>

          <View style={styles.statusIcon}>
            {lesson.status === 'completed' && (
              <Check size={28} color="#4CAF50" />
            )}
          </View>
        </View>

        <View style={styles.wordsContainer}>
          <Text style={styles.wordsLabel}>Mots clés :</Text>
          <View style={styles.wordsPreview}>
            {lesson.words.map((word, index) => (
              <View key={index} style={styles.wordChip}>
                <Text style={styles.wordText}>{word}</Text>
              </View>
            ))}
          </View>
        </View>

        {lesson.progress > 0 && lesson.status !== 'locked' && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${lesson.progress}%` }
              ]} />
            </View>
            <Text style={styles.progressText}>{lesson.progress}% terminé</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: buttonConfig.color },
            buttonConfig.disabled && styles.disabledButton
          ]}
          disabled={buttonConfig.disabled}
          onPress={() => {
            if (!buttonConfig.disabled) {
              handleLessonAction(lesson, buttonConfig.text);
            }
          }}
        >
          <ButtonIcon size={20} color="#fff" />
          <Text style={styles.buttonText}>{buttonConfig.text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: titleColor }]}>Leçons</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: sectionLabelColor }]}>Parcours d'apprentissage</Text>
        {lessons.map(renderLessonCard)}
        
        {/* Espace pour la navigation fixe */}
        <View style={styles.navigationSpacer} />
      </ScrollView>

      {/* Navigation fixe en bas */}
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
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  lessonCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  lockedCard: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  lessonInfo: {
    flex: 1,
    paddingRight: 16,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  lessonSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 12,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    color: '#666',
  },
  statusIcon: {
    marginLeft: 8,
  },
  wordsContainer: {
    marginBottom: 16,
  },
  wordsLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  wordsPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wordChip: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  wordText: {
    fontSize: 12,
    color: '#6CA94F',
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#999',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigationSpacer: {
    height: 80, // Espace pour la navigation fixe
  },
});

export default Lecon;