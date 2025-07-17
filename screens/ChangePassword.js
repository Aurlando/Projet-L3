import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from './locales/firebase';
import { updatePassword } from 'firebase/auth';

export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = async () => {
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, password);
        setMessage('Mot de passe modifié !');
      }
    } catch (e) {
      setMessage('Erreur : ' + e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nouveau mot de passe</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderBottomWidth: 1 }} />
      <Button title="Changer" onPress={handleChange} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
} 