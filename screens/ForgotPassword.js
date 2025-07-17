import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './locales/firebase';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { theme } = useTheme();
  const titleColor = theme === 'dark' ? '#fff' : '#222';
  const bgColor = theme === 'dark' ? '#000' : '#fff';
  const textColor = theme === 'dark' ? '#ccc' : '#333';

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Un email de réinitialisation a été envoyé.');
    } catch (e) {
      setMessage('Erreur : ' + e.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>  
      {/* Header avec flèche de retour */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={titleColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: titleColor }]}>Mot de passe oublié</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.text, { color: textColor }]}>Entrez votre adresse email pour recevoir un lien de réinitialisation.</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Votre email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Envoyer le lien</Text>
        </TouchableOpacity>
        {message ? <Text style={[styles.message, { color: message.startsWith('Erreur') ? '#F44336' : '#4CAF50' }]}>{message}</Text> : null}
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Retour</Text>
        </TouchableOpacity>
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
  text: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#6CA94F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 15,
  },
}); 