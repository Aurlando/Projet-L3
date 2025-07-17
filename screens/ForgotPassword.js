import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './locales/firebase';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Un email de réinitialisation a été envoyé.');
    } catch (e) {
      setMessage('Erreur : ' + e.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Mot de passe oublié</Text>
      <Text style={{ marginBottom: 10 }}>Entrez votre adresse email pour recevoir un lien de réinitialisation.</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Votre email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderBottomWidth: 1, marginBottom: 20, fontSize: 16 }}
      />
      <Button title="Envoyer le lien" onPress={handleReset} />
      {message ? <Text style={{ marginTop: 20, color: message.startsWith('Erreur') ? 'red' : 'green' }}>{message}</Text> : null}
      <Button title="Retour" onPress={() => navigation.goBack()} color="#888" />
    </View>
  );
} 