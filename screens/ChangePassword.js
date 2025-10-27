import React, { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import { auth } from "./locales/firebase";
import { updatePassword } from "firebase/auth";
import { useTheme } from "../hooks/useTheme";

export default function ChangePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info"); // 'info', 'success', 'error'
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleChange = async () => {
        try {
            if (password !== confirmPassword) {
                setMessage("Les mots de passe ne correspondent pas");
                setMessageType("error");
                return;
            }

            if (password.length < 6) {
                setMessage(
                    "Le mot de passe doit contenir au moins 6 caractères"
                );
                setMessageType("error");
                return;
            }

            if (auth.currentUser) {
                await updatePassword(auth.currentUser, password);
                setMessage("Mot de passe modifié avec succès !");
                setMessageType("success");
                setPassword("");
                setConfirmPassword("");
            }
        } catch (e) {
            setMessage("Erreur : " + e.message);
            setMessageType("error");
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
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
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifier le mot de passe</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nouveau mot de passe</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                    placeholder="Entrez votre nouveau mot de passe"
                    placeholderTextColor={isDark ? "#888888" : "#666666"}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmer le mot de passe</Text>
                <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    style={styles.input}
                    placeholder="Confirmez votre nouveau mot de passe"
                    placeholderTextColor={isDark ? "#888888" : "#666666"}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleChange}>
                <Text style={styles.buttonText}>Modifier le mot de passe</Text>
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
                    <Text style={[styles.messageText, { color: "#ffffff" }]}>
                        {message}
                    </Text>
                </View>
            ) : null}
        </View>
    );
}
