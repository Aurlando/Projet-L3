import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function TraductionScreen() {
  const [texte, setTexte] = useState('');
  const [traduction, setTraduction] = useState('');

  const traduireTexte = async () => {
    if (!texte) return;

    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=mg&dt=t&q=${encodeURIComponent(texte)}`
      );
      const data = await response.json();
      setTraduction(data[0][0][0]);
    } catch (error) {
      console.error('Erreur de traduction :', error);
      setTraduction('Erreur lors de la traduction');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Traduction FR ➜ MG</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Entrez le texte en français"
        placeholderTextColor="#888"
        value={texte}
        onChangeText={setTexte}
      />
      
      <TouchableOpacity style={styles.bouton} onPress={traduireTexte}>
        <Text style={styles.boutonTexte}>Traduire</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Traduction malagasy</Text>
      <Text style={styles.resultat}>{traduction}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11120F',
    padding: 20,
    justifyContent: 'flex-start',
  },
  titre: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#2C2E2B',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  bouton: {
    backgroundColor: '#7ED957',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  boutonTexte: {
    color: '#000',
    fontWeight: 'bold',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  resultat: {
    backgroundColor: '#2C2E2B',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    minHeight: 60,
  },
});
