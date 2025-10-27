import React from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { culturesData } from "../data/cultures/culturesData";

const { width } = Dimensions.get("window");

export default function CultureDetail({ navigation, route }) {
    const { cultureId } = route.params;
    const culture = culturesData.find(c => c.id === cultureId);

    if (!culture) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Culture introuvable</Text>
            </View>
        );
    }

    const { details } = culture;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Banner Image */}
            <View style={styles.bannerContainer}>
                <Image 
                    source={details.header.bannerImage} 
                    style={styles.bannerImage}
                    resizeMode="cover"
                />
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Title & Introduction */}
            <View style={styles.content}>
                <Text style={styles.title}>{details.header.title}</Text>
                
                {details.header.introduction && (
                    <Text style={styles.introduction}>{details.header.introduction}</Text>
                )}

                {details.header.makiMessage && (
                    <View style={styles.makiContainer}>
                        <Image 
                            source={require("../assets/lemurien.png")} 
                            style={styles.makiIcon}
                        />
                        <Text style={styles.makiMessage}>{details.header.makiMessage}</Text>
                    </View>
                )}

                {/* Fiche d'Identité */}
                {details.identity && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>🏛️ Fiche d'Identité</Text>
                        <View style={styles.identityCard}>
                            <View style={styles.identityItem}>
                                <Ionicons name="location" size={20} color="#4CAF50" />
                                <Text style={styles.identityLabel}>Localisation</Text>
                            </View>
                            <Text style={styles.identityText}>{details.identity.localisation}</Text>
                        </View>

                        <View style={styles.identityCard}>
                            <View style={styles.identityItem}>
                                <Ionicons name="book" size={20} color="#4CAF50" />
                                <Text style={styles.identityLabel}>Signification</Text>
                            </View>
                            <Text style={styles.identityText}>{details.identity.meaning}</Text>
                        </View>

                        <View style={styles.identityCard}>
                            <View style={styles.identityItem}>
                                <Ionicons name="trophy" size={20} color="#4CAF50" />
                                <Text style={styles.identityLabel}>Type de Patrimoine</Text>
                            </View>
                            <Text style={styles.identityText}>{details.identity.heritageType}</Text>
                        </View>

                        {details.identity.keyElement && (
                            <View style={styles.identityCard}>
                                <View style={styles.identityItem}>
                                    <Ionicons name="sparkles" size={20} color="#4CAF50" />
                                    <Text style={styles.identityLabel}>Élément Clé</Text>
                                </View>
                                <Text style={styles.identityText}>{details.identity.keyElement}</Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Focus Section */}
                {details.focus && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{details.focus.title}</Text>
                        {details.focus.content.map((item, index) => (
                            <View key={index} style={styles.focusCard}>
                                <Text style={styles.focusSubtitle}>{item.subtitle}</Text>
                                <Text style={styles.focusText}>{item.text}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Location/Discover Section */}
                {details.location && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>📍 {details.location.title}</Text>
                        <Text style={styles.locationDescription}>{details.location.description}</Text>
                        {details.location.mapImage && (
                            <Image 
                                source={details.location.mapImage} 
                                style={styles.mapImage}
                                resizeMode="cover"
                            />
                        )}
                        <View style={styles.tipsCard}>
                            <Ionicons name="information-circle" size={20} color="#FF9800" />
                            <Text style={styles.tipsText}>{details.location.visitTips}</Text>
                        </View>
                    </View>
                )}

                {/* Ending Section */}
                {details.ending && (
                    <View style={styles.endingSection}>
                        <View style={styles.endingCard}>
                            <Text style={styles.endingText}>{details.ending.suggestion}</Text>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    bannerContainer: {
        width: "100%",
        height: 300,
        position: "relative",
    },
    bannerImage: {
        width: "100%",
        height: "100%",
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 16,
        lineHeight: 32,
    },
    introduction: {
        fontSize: 16,
        color: "#ccc",
        lineHeight: 24,
        marginBottom: 20,
    },
    makiContainer: {
        flexDirection: "row",
        backgroundColor: "#1A1A1A",
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        gap: 12,
        alignItems: "center",
    },
    makiIcon: {
        width: 40,
        height: 40,
    },
    makiMessage: {
        fontSize: 14,
        color: "#4CAF50",
        flex: 1,
        fontStyle: "italic",
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 16,
    },
    identityCard: {
        backgroundColor: "#1A1A1A",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    identityItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    identityLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#4CAF50",
    },
    identityText: {
        fontSize: 14,
        color: "#ccc",
        lineHeight: 20,
    },
    focusCard: {
        backgroundColor: "#1A1A1A",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    focusSubtitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4CAF50",
        marginBottom: 8,
    },
    focusText: {
        fontSize: 14,
        color: "#ccc",
        lineHeight: 20,
    },
    locationDescription: {
        fontSize: 14,
        color: "#ccc",
        marginBottom: 16,
        lineHeight: 20,
    },
    mapImage: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
    },
    tipsCard: {
        backgroundColor: "#FF9800",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 16,
        borderRadius: 12,
    },
    tipsText: {
        flex: 1,
        fontSize: 14,
        color: "#fff",
        fontWeight: "600",
    },
    endingSection: {
        marginTop: 16,
        marginBottom: 40,
    },
    endingCard: {
        backgroundColor: "#4CAF50",
        padding: 20,
        borderRadius: 12,
    },
    endingText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 24,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    errorText: {
        fontSize: 18,
        color: "#fff",
    },
});

