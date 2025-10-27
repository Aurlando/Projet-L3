import React, { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";
import { auth } from "./locales/firebase";
import { updateProfile, updateEmail } from "firebase/auth";
import { useTheme } from "../hooks/useTheme";

export default function EditProfile() {
    const user = auth.currentUser;
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info"); // 'info', 'success', 'error'
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const validateEmail = (email) => {
        return email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    };

    const handleSave = async () => {
        try {
            if (!displayName.trim()) {
                setMessage("Le nom d'utilisateur ne peut pas être vide");
                setMessageType("error");
                return;
            }

            if (!validateEmail(email)) {
                setMessage("Veuillez entrer une adresse email valide");
                setMessageType("error");
                return;
            }

            if (user) {
                await updateProfile(user, { displayName });
                if (email !== user.email) await updateEmail(user, email);
                setMessage("Profil mis à jour avec succès !");
                setMessageType("success");
            }
        } catch (e) {
            setMessage("Erreur : " + e.message);
            setMessageType("error");
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
        },
        scrollView: {
            padding: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            color: isDark ? "#ffffff" : "#000000",
            textAlign: "center",
        },
        inputContainer: {
            marginBottom: 20,
        },
        label: {
            fontSize: 16,
            marginBottom: 8,
            color: isDark ? "#ffffff" : "#000000",
        },
        input: {
            backgroundColor: isDark ? "#333333" : "#f5f5f5",
            borderRadius: 8,
            padding: 12,
            color: isDark ? "#ffffff" : "#000000",
            marginBottom: 8,
        },
        button: {
            backgroundColor: "#007AFF",
            borderRadius: 8,
            padding: 15,
            alignItems: "center",
            marginTop: 20,
        },
        buttonText: {
            color: "#ffffff",
            fontSize: 16,
            fontWeight: "bold",
        },
        message: {
            padding: 15,
            borderRadius: 8,
            marginTop: 20,
            alignItems: "center",
        },
        messageText: {
            fontSize: 16,
        },
        messageSuccess: {
            backgroundColor: "#4CAF50",
        },
        messageError: {
            backgroundColor: "#f44336",
        },
        messageInfo: {
            backgroundColor: "#2196F3",
        },
        currentInfo: {
            fontSize: 14,
            color: isDark ? "#888888" : "#666666",
            marginTop: 4,
        },
    });

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>Modifier le profil</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nom d'utilisateur</Text>
                    <TextInput
                        value={displayName}
                        onChangeText={setDisplayName}
                        style={styles.input}
                        placeholder="Entrez votre nom d'utilisateur"
                        placeholderTextColor={isDark ? "#888888" : "#666666"}
                    />
                    <Text style={styles.currentInfo}>
                        Nom actuel : {user?.displayName || "Non défini"}
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Adresse email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        placeholder="Entrez votre adresse email"
                        placeholderTextColor={isDark ? "#888888" : "#666666"}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Text style={styles.currentInfo}>
                        Email actuel : {user?.email || "Non défini"}
                    </Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>
                        Enregistrer les modifications
                    </Text>
                </TouchableOpacity>

                {message ? (
                    <View
                        style={[
                            styles.message,
                            messageType === "success" && styles.messageSuccess,
                            messageType === "error" && styles.messageError,
                            messageType === "info" && styles.messageInfo,
                        ]}
                    >
                        <Text
                            style={[styles.messageText, { color: "#ffffff" }]}
                        >
                            {message}
                        </Text>
                    </View>
                ) : null}
            </ScrollView>
        </View>
    );
}
