import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export default function About({ navigation }) {
  const { theme } = useTheme();
  const titleColor = theme === 'dark' ? '#fff' : '#222';
  const bgColor = theme === 'dark' ? '#000' : '#fff';
  const textColor = theme === 'dark' ? '#ccc' : '#333';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>  
      {/* Header avec flèche de retour */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={titleColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: titleColor }]}>À propos</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: titleColor }]}>À propos de l'application</Text>
        <Text style={[styles.text, { color: textColor }]}>Hiteny - Apprenez le malgache et découvrez Madagascar. Application réalisée dans le cadre du projet L3 IGGLIA.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
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
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 