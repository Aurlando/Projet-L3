import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Clock, Lock, Play, Check } from 'lucide-react-native';

const lessons = [
  {
    id: 1,
    title: 'Basic Greetings',
    subtitle: 'Learn how to say hello and goodbye',
    difficulty: 'Beginner',
    duration: '10 min',
    completed: true,
    locked: false,
    progress: 100,
    words: ['Tongasoa', 'Veloma', 'Misaotra'],
  },
  {
    id: 2,
    title: 'Family Members',
    subtitle: 'Words for family relationships',
    difficulty: 'Beginner',
    duration: '15 min',
    completed: true,
    locked: false,
    progress: 100,
    words: ['Ray', 'Reny', 'Rahalahy'],
  },
  {
    id: 3,
    title: 'Numbers 1-20',
    subtitle: 'Count from one to twenty',
    difficulty: 'Beginner',
    duration: '12 min',
    completed: false,
    locked: false,
    progress: 60,
    words: ['Iray', 'Roa', 'Telo'],
  },
  {
    id: 4,
    title: 'Common Verbs',
    subtitle: 'Essential action words',
    difficulty: 'Intermediate',
    duration: '20 min',
    completed: false,
    locked: false,
    progress: 0,
    words: ['Mandeha', 'Mihinana', 'Misotro'],
  },
  {
    id: 5,
    title: 'Food & Drinks',
    subtitle: 'Vocabulary for meals and beverages',
    difficulty: 'Intermediate',
    duration: '18 min',
    completed: false,
    locked: true,
    progress: 0,
    words: ['Vary', 'Hena', 'Rano'],
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Beginner':
      return '#4CAF50'; // vert
    case 'Intermediate':
      return '#FF9800'; // orange
    case 'Advanced':
      return '#F44336'; // rouge
    default:
      return '#999';
  }
};

const Lecon = () => {
  const renderLessonCard = (lesson) => {
    const isLocked = lesson.locked;
    const isCompleted = lesson.completed;
    const inProgress = lesson.progress > 0 && lesson.progress < 100;

    return (
      <TouchableOpacity
        key={lesson.id}
        style={[styles.lessonCard, isLocked && styles.lockedCard]}
        disabled={isLocked}
        activeOpacity={0.8}
      >
        <View style={styles.lessonHeader}>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>

            <View style={styles.lessonMeta}>
              <View
                style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(lesson.difficulty) },
                ]}
              >
                <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
              </View>

              <View style={styles.durationContainer}>
                <Clock size={12} color="#666" />
                <Text style={styles.durationText}>{lesson.duration}</Text>
              </View>
            </View>
          </View>

          <View style={styles.statusIcon}>
            {isLocked ? (
              <Lock size={24} color="#999" />
            ) : isCompleted ? (
              <Check size={24} color="#4CAF50" />
            ) : (
              <Play size={24} color="#2196F3" />
            )}
          </View>
        </View>

        <View style={styles.wordsPreview}>
          {lesson.words.map((word, index) => (
            <View key={index} style={styles.wordChip}>
              <Text style={styles.wordText}>{word}</Text>
            </View>
          ))}
        </View>

        {!isLocked && (lesson.progress > 0 || inProgress) && (
          <View style={styles.lessonProgress}>
            <View style={styles.lessonProgressBar}>
              <View
                style={[
                  styles.lessonProgressFill,
                  { width: `${lesson.progress}%` },
                ]}
              />
            </View>
            <Text style={styles.lessonProgressText}>
              {lesson.progress}% complete
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leçons Disponibles</Text>
      {lessons.map(renderLessonCard)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  lessonCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  lockedCard: {
    opacity: 0.5,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lessonInfo: {
    flex: 1,
    paddingRight: 10,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  lessonSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 8,
  },
  difficultyText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  statusIcon: {
    marginLeft: 8,
  },
  wordsPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
  },
  wordChip: {
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  wordText: {
    fontSize: 12,
    color: '#00796B',
  },
  lessonProgress: {
    marginTop: 8,
  },
  lessonProgressBar: {
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 3,
    overflow: 'hidden',
  },
  lessonProgressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
  },
  lessonProgressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default Lecon;
