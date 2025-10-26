import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { lessonsData } from "../data/lessons/lessonsData";
import { auth, db } from "./locales/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import BottomNavigation from "../components/BottomNavigation";

// Déterminer la difficulté d'une leçon basée sur son ID
const getDifficulty = (lessonId) => {
    if (lessonId <= 2) return { label: "Débutant", color: "#4CAF50" };
    if (lessonId <= 5) return { label: "Intermédiaire", color: "#FF9800" };
    return { label: "Avancé", color: "#F44336" };
};

export default function Lecon({ navigation, route }) {
    const [userProgress, setUserProgress] = useState({
        completedLessons: [],
        unlockedLessons: [1],
    });
    const [isGuest, setIsGuest] = useState(true);

    // 🔄 Récupérer les infos utilisateur
    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                setIsGuest(false);
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserProgress({
                        completedLessons: data.completedLessons || [],
                        unlockedLessons: data.unlockedLessons || [1],
                    });
                } else {
                    // Créer un nouveau document si inexistant
                    await setDoc(userRef, {
                        completedLessons: [],
                        unlockedLessons: [1],
                    });
                }
            } else {
                setIsGuest(true);
            }
        };

        fetchUserData();
    }, []);

    // 🔓 Débloquer une nouvelle leçon si une précédente a été terminée
    useEffect(() => {
        if (route.params?.completedLessonId && !isGuest) {
            const completedId = route.params.completedLessonId;
            const newUnlockedId = completedId + 1;

            setUserProgress((prev) => {
                const updated = {
                    completedLessons: [
                        ...new Set([...prev.completedLessons, completedId]),
                    ],
                    unlockedLessons: [
                        ...new Set([...prev.unlockedLessons, newUnlockedId]),
                    ],
                };

                // Sauvegarder dans Firestore
                const user = auth.currentUser;
                if (user) {
                    updateDoc(doc(db, "users", user.uid), updated);
                }

                return updated;
            });

            Alert.alert("Bravo 🎉", "Tu as débloqué la leçon suivante !");
        }
    }, [route.params]);

    // 🔹 Fonction pour ouvrir une leçon
    const handleOpenLesson = (lesson) => {
        if (isGuest) {
            Alert.alert(
                "Connexion requise",
                "Connecte-toi pour suivre les leçons !"
            );
            return;
        }

        if (!userProgress.unlockedLessons.includes(lesson.id)) {
            Alert.alert(
                "Leçon bloquée 🔒",
                "Termine la leçon précédente pour débloquer celle-ci !"
            );
            return;
        }

        navigation.navigate("lessonDetail", { lessonId: lesson.id });
    };

    // 🧠 Déterminer le statut d'une leçon
    const getLessonStatus = (lessonId) => {
        if (userProgress.completedLessons.includes(lessonId)) return "reviser";
        if (userProgress.unlockedLessons.includes(lessonId)) return "en_cours";
        return "bloque";
    };

    // Calculer la progression globale
    const totalLessons = lessonsData.length;
    const completedCount = userProgress.completedLessons.length;
    const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Leçons</Text>
                    <Text style={styles.headerSubtitle}>Apprenez le malagasy de manière interactive</Text>
                </View>
                <View style={styles.backButton} />
            </View>

            {/* Progress Widget */}
            <View style={styles.progressWidget}>
                <View style={styles.progressWidgetContent}>
                    <View style={styles.progressWidgetHeader}>
                        <Ionicons name="book" size={20} color="#fff" />
                        <Text style={styles.progressWidgetTitle}>Votre progression</Text>
                    </View>
                    <View style={styles.progressBarWidget}>
                        <View style={[styles.progressBarWidgetFill, { width: `${progressPercentage}%` }]} />
                    </View>
                    <Text style={styles.progressWidgetText}>
                        {completedCount} leçon{completedCount > 1 ? 's' : ''} sur {totalLessons} complétée{completedCount > 1 ? 's' : ''} ({progressPercentage}%)
                    </Text>
                </View>
            </View>

            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {lessonsData.map((lesson) => {
                    const status = getLessonStatus(lesson.id);
                    const isCompleted = status === "reviser";
                    const isUnlocked = status !== "bloque";
                    const difficulty = getDifficulty(lesson.id);
                    
                    // Calculer le pourcentage de progression
                    // Note: On pourrait sauvegarder la progression individuelle dans Firestore
                    let progress = 0;
                    if (isCompleted) {
                        progress = 100;
                    } else if (!isUnlocked) {
                        progress = 0;
                    }
                    // Pour les leçons débloquées mais non complétées, progress = 0 par défaut

                    return (
                        <View key={lesson.id} style={styles.lessonCard}>
                            {/* Header de la carte */}
                            <View style={styles.cardHeader}>
                                <View style={styles.cardHeaderLeft}>
                                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                                    {isCompleted && (
                                        <Ionicons 
                                            name="checkmark-circle" 
                                            size={24} 
                                            color="#4CAF50" 
                                            style={styles.checkIcon}
                                        />
                                    )}
                                </View>
                            </View>

                            {/* Description */}
                            <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>

                            {/* Méta informations */}
                            <View style={styles.metaContainer}>
                                <View style={[styles.difficultyBadge, { backgroundColor: difficulty.color }]}>
                                    <Text style={styles.difficultyText}>{difficulty.label}</Text>
                                </View>
                                <View style={styles.durationContainer}>
                                    <Ionicons name="time-outline" size={16} color="#888" />
                                    <Text style={styles.durationText}>{lesson.steps.length * 5} min</Text>
                                </View>
                            </View>

                            {/* Mots clés */}
                            <View style={styles.keywordsContainer}>
                                <Text style={styles.keywordsLabel}>Mots clés :</Text>
                                <View style={styles.keywordsRow}>
                                    {lesson.steps[1]?.content?.slice(0, 3).map((word, idx) => (
                                        <View key={idx} style={styles.keywordTag}>
                                            <Text style={styles.keywordText}>{word.malagasy}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Barre de progression - seulement si débloquée */}
                            {isUnlocked && (
                                <View style={styles.progressContainer}>
                                    <View style={styles.progressBarBackground}>
                                        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                                    </View>
                                    <Text style={styles.progressText}>{progress}% terminé</Text>
                                </View>
                            )}

                            {/* Bouton d'action */}
                            <TouchableOpacity
                                style={[
                                    styles.actionButton,
                                    !isUnlocked && styles.actionButtonLocked,
                                    isCompleted && styles.actionButtonReview
                                ]}
                                onPress={() => handleOpenLesson(lesson)}
                                disabled={!isUnlocked}
                            >
                                {isUnlocked ? (
                                    <>
                                        <Ionicons 
                                            name={isCompleted ? "refresh" : "play"} 
                                            size={20} 
                                            color="#fff" 
                                            style={styles.actionIcon}
                                        />
                                        <Text style={styles.actionButtonText}>
                                            {isCompleted ? "Réviser" : "Commencer"}
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Ionicons 
                                            name="lock-closed" 
                                            size={20} 
                                            color="#888" 
                                            style={styles.actionIcon}
                                        />
                                        <Text style={[styles.actionButtonText, styles.actionButtonTextLocked]}>
                                            Verrouillé
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    );
                })}

                {isGuest && (
                    <View style={styles.guestBox}>
                        <Text style={styles.guestText}>
                            Connecte-toi pour débloquer les leçons et sauvegarder ta progression.
                        </Text>
                    </View>
                )}
            </ScrollView>
            
            <BottomNavigation navigation={navigation} currentScreen="lecon" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
    headerTitleContainer: {
        flex: 1,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#888",
        marginTop: 4,
    },
    progressWidget: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    progressWidgetContent: {
        backgroundColor: "#1A1A1A",
        borderRadius: 12,
        padding: 16,
    },
    progressWidgetHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    progressWidgetTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    progressBarWidget: {
        height: 8,
        backgroundColor: "#2A2A2A",
        borderRadius: 4,
        marginBottom: 8,
        overflow: "hidden",
    },
    progressBarWidgetFill: {
        height: "100%",
        backgroundColor: "#4CAF50",
        borderRadius: 4,
    },
    progressWidgetText: {
        fontSize: 14,
        color: "#ccc",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Espace pour la bottom navigation
    },
    lessonCard: {
        backgroundColor: "#1A1A1A",
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
    },
    cardHeader: {
        marginBottom: 8,
    },
    cardHeaderLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    lessonTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        flex: 1,
    },
    checkIcon: {
        marginLeft: 8,
    },
    lessonSubtitle: {
        color: "#888",
        fontSize: 14,
        marginBottom: 12,
    },
    metaContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
    },
    difficultyBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    difficultyText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    durationContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    durationText: {
        color: "#888",
        fontSize: 14,
    },
    keywordsContainer: {
        marginBottom: 12,
    },
    keywordsLabel: {
        color: "#888",
        fontSize: 14,
        marginBottom: 6,
    },
    keywordsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    keywordTag: {
        borderWidth: 1,
        borderColor: "#4CAF50",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: "#1A1A1A",
    },
    keywordText: {
        color: "#4CAF50",
        fontSize: 12,
    },
    progressContainer: {
        marginBottom: 16,
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: "#2A2A2A",
        borderRadius: 3,
        marginBottom: 8,
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "#4CAF50",
        borderRadius: 3,
    },
    progressText: {
        color: "#fff",
        fontSize: 14,
    },
    actionButton: {
        backgroundColor: "#4CAF50",
        borderRadius: 12,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    actionButtonReview: {
        backgroundColor: "#007AFF",
    },
    actionButtonLocked: {
        backgroundColor: "#2A2A2A",
    },
    actionIcon: {
        marginRight: 4,
    },
    actionButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    actionButtonTextLocked: {
        color: "#888",
    },
    guestBox: {
        marginTop: 20,
        backgroundColor: "#1A1A1A",
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#4CAF50",
    },
    guestText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 14,
    },
});
