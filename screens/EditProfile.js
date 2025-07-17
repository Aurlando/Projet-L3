import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from './locales/firebase';
import { updateProfile, updateEmail } from 'firebase/auth';

export default function EditProfile() {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    try {
      if (user) {
        await updateProfile(user, { displayName });
        if (email !== user.email) await updateEmail(user, email);
        setMessage('Profil mis à jour !');
      }
    } catch (e) {
      setMessage('Erreur : ' + e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nom d'utilisateur</Text>
      <TextInput value={displayName} onChangeText={setDisplayName} style={{ borderBottomWidth: 1 }} />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderBottomWidth: 1 }} />
      <Button title="Enregistrer" onPress={handleSave} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
} 