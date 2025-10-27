import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { culturesData } from '../data/cultures/culturesData';
import BottomNavigation from '../components/BottomNavigation';

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;

export default function Culture({ navigation }) {
    const openCulture = (culture) => {
        navigation.navigate("CultureDetail", { cultureId: culture.id });
    };

          return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Culture</Text>
                    <Text style={styles.headerSubtitle}>Découvrez les traditions de Madagascar</Text>
                </View>
                <View style={styles.backButton} />
            </View>

            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {culturesData.map((culture) => (
                    <TouchableOpacity
                        key={culture.id}
                        style={styles.cultureCard}
                        onPress={() => openCulture(culture)}
                    >
                        {/* Image */}
                        <Image 
                            source={culture.preview.image} 
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        
                        {/* Badge */}
                        <View style={styles.badgeContainer}>
                            <View style={styles.badge}>
                                <Ionicons name="heart" size={14} color="#fff" />
                                <Text style={styles.badgeText}>{culture.preview.badge}</Text>
            </View>
            </View>

                        {/* Content */}
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{culture.preview.title}</Text>
                            <Text style={styles.cardTagline}>{culture.preview.tagline}</Text>
                            <Text style={styles.cardShortInfo}>{culture.preview.shortInfo}</Text>
                </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <BottomNavigation navigation={navigation} currentScreen="decouverte" />
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    cultureCard: {
        backgroundColor: "#1A1A1A",
        borderRadius: 16,
        marginBottom: 20,
        overflow: "hidden",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    cardImage: {
        width: "100%",
        height: 200,
    },
    badgeContainer: {
        position: "absolute",
        top: 12,
        right: 12,
    },
    badge: {
        backgroundColor: "#F44336",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 6,
    },
    cardTagline: {
        fontSize: 14,
        color: "#4CAF50",
        fontWeight: "600",
        marginBottom: 8,
    },
    cardShortInfo: {
        fontSize: 14,
        color: "#888",
        lineHeight: 20,
    },
});

// export default Culture; 