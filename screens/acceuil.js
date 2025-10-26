// screens/accueil.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigation from "../components/BottomNavigation";
import MenuHamburger from "../components/MenuHamburger";
import { useTheme } from "../hooks/useTheme";
import { signOut } from "firebase/auth";
import { auth, db } from "./locales/firebase";
import { getDoc, doc } from "firebase/firestore";
import ProgressGraph from "../components/ProgressGraph";

// Données simulées pour guest
const GUEST_STATS = { lessonsCompleted: 0, totalLessons: 6, studyTime: 0 };

const Accueil = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userStats, setUserStats] = useState(GUEST_STATS);
  const [isGuest, setIsGuest] = useState(true);
  const [objectif, setObjectif] = useState(6);

  // Récupération infos utilisateur depuis Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setIsGuest(false);
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const data = userDoc.exists() ? userDoc.data() : {};
          setUserName(data.name || user.displayName || "");
          setUserEmail(data.email || user.email || "");

          // Statistiques user si disponibles
          const lessonsCompleted = data.lessonsCompleted ?? 0;
          const totalLessons = data.totalLessons ?? 6;
          const studyTime = data.studyTime ?? 0;
          setUserStats({ lessonsCompleted, totalLessons, studyTime });
          
          // Définir l'objectif pour le graphique
          setObjectif(totalLessons > 0 ? totalLessons : 6);
        } catch (e) {
          console.error("Erreur récupération données:", e);
          setUserName(user.displayName || "");
          setUserEmail(user.email || "");
          setUserStats(GUEST_STATS);
          setObjectif(6);
        }
      } else {
        // Guest
        setIsGuest(true);
        setUserName("Guest");
        setUserEmail("");
        setUserStats(GUEST_STATS);
        setObjectif(0);
      }
    };

    fetchUserData();
  }, []); // Charger au montage du composant

  // Recharger si le menu s'ouvre
  useEffect(() => {
    if (menuVisible) {
      const fetchUserData = async () => {
        const user = auth.currentUser;
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const data = userDoc.exists() ? userDoc.data() : {};
            setUserName(data.name || user.displayName || "");
            setUserEmail(data.email || user.email || "");
          } catch (e) {
            console.error("Erreur récupération données:", e);
          }
        }
      };
      fetchUserData();
    }
  }, [menuVisible]);

  const { lessonsCompleted, totalLessons, studyTime } = userStats;

  // Valeurs sécurisées pour le graphique
  const safeLessonsCompleted = lessonsCompleted ?? 0;
  const safeTotalLessons = totalLessons > 0 ? totalLessons : 1;

  // Fonction helper pour sécuriser les valeurs
  const safeValue = (v) => {
    const num = Number(v);
    if (!isFinite(num) || isNaN(num)) return 0;
    return Math.max(0, Math.min(num, 100));
  };

  // Calculer la progression réelle (30 jours) en pourcentage
  // Simuler une progression basée sur lessonsCompleted
  const realProgressData = Array.from({ length: 30 }, (_, index) => {
    if (isGuest || !safeLessonsCompleted) return 0;
    
    // Calculer le pourcentage de progression total
    const progressPercentage = (safeLessonsCompleted / safeTotalLessons) * 100;
    
    // Estimer les leçons complétées par jour (moyenne)
    const avgLessonsPerDay = safeLessonsCompleted / 30;
    const progressForDay = (avgLessonsPerDay / safeTotalLessons) * 100;
    
    // Calculet la progression cumulée jusqu'à ce jour
    const cumulativeProgress = Math.min(progressForDay * (index + 1), progressPercentage);
    
    return safeValue(cumulativeProgress);
  });

  // Format temps d'étude
  const hours = Math.floor(studyTime / 60);
  const minutes = studyTime % 60;
  const formattedTime = `${hours}h${minutes}min`;

  // Couleurs selon thème
  const titleColor = theme === "dark" ? "#fff" : "#222";
  const sectionLabelColor = theme === "dark" ? "#fff" : "#222";

  return (
    <View style={[styles.container, { backgroundColor: theme === "dark" ? "#000" : "#fff" }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" color={theme === "dark" ? "#fff" : "#000"} size={32} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: titleColor }]}>Hiteny</Text>
        <Ionicons name="help-circle-outline" size={28} color={theme === "dark" ? "#fff" : "#000"} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Section Maki */}
        <View style={styles.makiSection}>
          <Image source={require("./../assets/auth-vector.png")} style={styles.imageMaki} />
          <View style={styles.textMaki}>
            <Text style={{ color: titleColor, fontSize: 20, fontWeight: "bold" }}>Maki</Text>
            <Text style={{ color: "grey", fontSize: 16 }}>Continuez votre apprentissage</Text>
          </View>
        </View>

        {/* Statistiques */}
        <Text style={[styles.sectionLabel, { color: sectionLabelColor }]}>Statistiques</Text>
        <View style={styles.statsRow}>
          <View style={styles.statsBox}>
            <Text style={styles.statsLabel}>Leçons réussies</Text>
            <Text style={styles.statsValue}>{safeLessonsCompleted} / {safeTotalLessons}</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsLabel}>Temps d'étude</Text>
            <Text style={styles.statsValue}>{formattedTime}</Text>
          </View>
        </View>

        {/* Progression graphique */}
        <Text style={[styles.sectionLabel, { color: sectionLabelColor }]}>Progrès en Malagasy</Text>
        <ProgressGraph
          objectif={objectif}
          realProgress={realProgressData}
          isGuest={isGuest}
        />

        {/* Citation */}
        <View style={styles.citationBox}>
          <Image source={require("./../assets/stade-barea.jpg")} style={styles.imageStade} />
          <View style={styles.citationOverlay}>
            <Text style={styles.citationMalagasy}>Aza kivy, mbola misy andro mahery.</Text>
            <Text style={styles.citationFr}>Ne te décourage pas, il y a encore d'autres jours meilleurs.</Text>
          </View>
        </View>

        {/* Suggestions */}
        <Text style={[styles.sectionLabel, { color: sectionLabelColor }]}>Suggestions</Text>
        <TouchableOpacity onPress={() => navigation.navigate("lecon")} style={styles.button}>
          <Text style={styles.buttonText}>Commencer une leçon</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("decouverte")} style={styles.button}>
          <Text style={styles.buttonText}>Découvrir Madagascar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!auth.currentUser) return Alert.alert("Connexion requise", "Veuillez vous connecter pour accéder à cette fonctionnalité.");
            navigation.navigate("traduction");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Faire une traduction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!auth.currentUser) return Alert.alert("Connexion requise", "Veuillez vous connecter pour accéder à cette fonctionnalité.");
            navigation.navigate("chatbot");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Aller au Chatbot</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Menu Hamburger */}
      <MenuHamburger
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onEditProfile={() => { setMenuVisible(false); navigation.navigate("editProfile"); }}
        onChangePassword={() => { setMenuVisible(false); navigation.navigate("changePassword"); }}
        theme={theme}
        toggleTheme={toggleTheme}
        onAbout={() => { setMenuVisible(false); navigation.navigate("about"); }}
        onLogout={async () => {
          setMenuVisible(false);
          try {
            await signOut(auth);
            navigation.reset({ index: 0, routes: [{ name: "home" }] });
          } catch (e) {
            alert("Erreur lors de la déconnexion : " + e.message);
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
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 40, paddingBottom: 10 },
  title: { fontSize: 26, fontWeight: "bold" },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  makiSection: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  imageMaki: { width: 80, height: 100, borderRadius: 12 },
  textMaki: { marginLeft: 20, flex: 1 },
  sectionLabel: { color: "#fff", fontWeight: "bold", fontSize: 18, marginTop: 20, marginBottom: 10 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  statsBox: { backgroundColor: "#282828", borderRadius: 10, padding: 16, width: "48%", alignItems: "center" },
  statsLabel: { color: "grey", fontSize: 14, marginBottom: 4 },
  statsValue: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  citationBox: { marginTop: 20, marginBottom: 20, alignItems: "center", position: "relative" },
  imageStade: { borderRadius: 12, opacity: 0.7, width: "100%", height: 120, resizeMode: "cover" },
  citationOverlay: { position: "absolute", top: 0, left: 0, right: 0, height: 120, justifyContent: "center", alignItems: "center", paddingHorizontal: 10 },
  citationMalagasy: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 4, textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  citationFr: { color: "#fff", fontSize: 15, textAlign: "center", textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  button: { backgroundColor: "#282828", borderRadius: 10, marginBottom: 12, paddingVertical: 14, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default Accueil;
