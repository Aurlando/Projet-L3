import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation';
import MenuHamburger from '../components/MenuHamburger';
import { useTheme } from '../hooks/useTheme';
import { signOut } from 'firebase/auth';
import { auth, db } from './locales/firebase';
import { getDoc, doc } from 'firebase/firestore';

// Données simulées pour l'utilisateur
const USER_STATS = {
  lessonsCompleted: 3, // À remplacer par la vraie logique utilisateur
  totalLessons: 6,
  studyTime: 75, // en minutes
};

const Accueil = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserName(data.name || '');
            setUserEmail(data.email || '');
          } else {
            setUserName(user.displayName || '');
            setUserEmail(user.email || '');
          }
        } catch (e) {
          setUserName(user.displayName || '');
          setUserEmail(user.email || '');
        }
      }
    };
    if (menuVisible) fetchUserData();
  }, [menuVisible]);

  // Calcul du temps d'étude formaté
  let lessonsCompleted = USER_STATS.lessonsCompleted;
  let totalLessons = USER_STATS.totalLessons;
  let studyTime = USER_STATS.studyTime;
  if (!auth.currentUser) {
    lessonsCompleted = 0;
    totalLessons = 0;
    studyTime = 0;
  }
  const hours = Math.floor(studyTime / 60);
  const minutes = studyTime % 60;
  const formattedTime = `${hours}h${minutes}min`;

  // Détermine la couleur des grands titres selon le thème
  const titleColor = theme === 'dark' ? '#fff' : '#222';
  const sectionLabelColor = theme === 'dark' ? '#fff' : '#222';

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>  
      {/* Header principal */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" color={theme === 'dark' ? '#fff' : '#000'} size={32} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: titleColor }]}>Hiteny</Text>
        <Ionicons name="help-circle-outline" size={28} color={theme === 'dark' ? '#fff' : '#000'} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Section Maki */}
        <View style={styles.makiSection}>
          <Image source={require('./../assets/auth-vector.png')} style={styles.imageMaki} />
          <View style={styles.textMaki}>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#222', fontSize: 20, fontWeight: 'bold' }}>Maki</Text>
            <Text style={{ color: 'grey', fontSize: 16 }}>Continuez votre apprentissage</Text>
          </View>
        </View>

        {/* Statistiques dynamiques */}
        <Text style={[styles.sectionLabel, { color: sectionLabelColor }]}>Statistiques</Text>
        <View style={styles.statsRow}>
          <View style={styles.statsBox}>
            <Text style={styles.statsLabel}>Leçons réussies</Text>
            <Text style={styles.statsValue}>{lessonsCompleted} / {totalLessons}</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsLabel}>Temps d'étude</Text>
            <Text style={styles.statsValue}>{formattedTime}</Text>
          </View>
        </View>

        {/* Progrès en Malagasy + espace pour courbe */}
        <Text style={[styles.sectionLabel, { color: sectionLabelColor }]}>Progrès en Malagasy</Text>
        <View style={styles.progressBarContainer}>
          {/* Barre de progression fictive */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${totalLessons > 0 ? (lessonsCompleted / totalLessons * 100) : 0}%` }]} />
          </View>
          {/* Espace réservé pour une future courbe de progression */}
          <View style={styles.curvePlaceholder}>
            <Text style={styles.curveText}>[Courbe de progression à venir]</Text>
          </View>
        </View>

        {/* Citation superposée sur l'image */}
        <View style={styles.citationBox}>
          <Image source={require('./../assets/stade-barea.jpg')} style={styles.imageStade} />
          <View style={styles.citationOverlay}>
            <Text style={styles.citationMalagasy}>Aza kivy, mbola misy andro mahery.</Text>
            <Text style={styles.citationFr}>Ne te décourage pas, il y a encore d'autres jours meilleurs.</Text>
          </View>
        </View>

        {/* Suggestions */}
        <Text style={[styles.sectionLabel, { color: sectionLabelColor }]}>Suggestions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('lecon')} style={styles.button}><Text style={styles.buttonText}>Commencer une leçon</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('decouverte')} style={styles.button}><Text style={styles.buttonText}>Découvrir Madagascar</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if (!auth.currentUser) {
            Alert.alert('Connexion requise', 'Veuillez vous connecter pour accéder à cette fonctionnalité.');
            return;
          }
          navigation.navigate('traduction');
        }} style={styles.button}><Text style={styles.buttonText}>Faire une traduction</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if (!auth.currentUser) {
            Alert.alert('Connexion requise', 'Veuillez vous connecter pour accéder à cette fonctionnalité.');
            return;
          }
          navigation.navigate('chatbot');
        }} style={styles.button}><Text style={styles.buttonText}>Aller au Chatbot</Text></TouchableOpacity>
      </ScrollView>

      {/* Menu Hamburger */}
      <MenuHamburger
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onEditProfile={() => { setMenuVisible(false); navigation.navigate('editProfile'); }}
        onChangePassword={() => { setMenuVisible(false); navigation.navigate('changePassword'); }}
        theme={theme}
        toggleTheme={toggleTheme}
        onAbout={() => { setMenuVisible(false); navigation.navigate('about'); }}
        onLogout={async () => {
          setMenuVisible(false);
          try {
            await signOut(auth);
            navigation.reset({ index: 0, routes: [{ name: 'home' }] });
          } catch (e) {
            alert('Erreur lors de la déconnexion : ' + e.message);
          }
        }}
        userName={userName}
        userEmail={userEmail}
      />
      {/* Navigation Fixe */}
      <BottomNavigation navigation={navigation} currentScreen="accueil" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  makiSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageMaki: {
    width: 80,
    height: 100,
    borderRadius: 12,
  },
  textMaki: {
    marginLeft: 20,
    flex: 1,
  },
  sectionLabel: {
    color: '#fff', // Grands titres en blanc
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statsBox: {
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 16,
    width: '48%',
    alignItems: 'center',
  },
  statsLabel: {
    color: 'grey',
    fontSize: 14,
    marginBottom: 4,
  },
  statsValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    marginBottom: 20,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6CA94F',
    borderRadius: 5,
  },
  curvePlaceholder: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  curveText: {
    color: 'grey',
    fontStyle: 'italic',
  },
  citationBox: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
  },
  imageStade: {
    borderRadius: 12,
    opacity: 0.7,
    width: '100%',
    height: 120,
    marginBottom: 0,
    resizeMode: 'cover',
  },
  citationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  citationMalagasy: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  citationFr: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: '#282828',
    borderRadius: 10,
    marginBottom: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Accueil;
