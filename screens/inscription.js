import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './locales/firebase'; // remplace par le bon chemin si besoin
import CheckBox from 'expo-checkbox';

export default function Inscription({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        password
      });
      alert('Inscription réussie ✅');
      navigation.navigate('connexion');
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Flèche de retour */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      <Text style={styles.title}>Hiteny</Text>
      <Ionicons name="help-circle-outline" size={30} color={'#fff'} style={{left: 120}}/>
      </View>
      {/* Titre */}
      <Text style={styles.subtitle}>Créer un compte</Text>
      <Text style={styles.text}>Rejoignez-nous et commencez votre aventure Malagasy</Text>

      {/* Champ Nom */}
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Votre Nom"
          placeholderTextColor="#fff"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Champ Email */}
      <View style={styles.inputContainer}>
        <Entypo name="email" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="votremail@gmail.com"
          placeholderTextColor="#fff"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Champ Mot de passe */}
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#fff"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="white" />
        </TouchableOpacity>
      </View>
      
      {/*checkbox*/}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={termsAccepted}
          onValueChange={setTermsAccepted}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Accepter les termes et conditions</Text>
      </View>

      {/* Bouton s’inscrire */}
      <TouchableOpacity
        onPress={handleRegister}
        style={[styles.buttonFilled,!termsAccepted && styles.buttonDisabled]}
        disabled={!termsAccepted}
      >
        <Text style={styles.buttonFilledText}>S'inscrire</Text>
      </TouchableOpacity>


      {/* Réseaux sociaux */}
      <View style={styles.dividerContainer}>
        <Text style={styles.or}>S'inscrire avec</Text>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image source={{ uri: 'https://img.icons8.com/color/48/facebook-new.png' }} style={styles.iconSocial} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }} style={styles.iconSocial} />
        </TouchableOpacity>
      </View>

      {/* Lien Connexion */}
      <Text style={styles.loginText}>
        Vous avez déjà un compte ? <Text style={styles.loginLink}nPress={() => navigation.navigate('Connexion')} o>Connexion</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  backButton: {
    left: -130
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: -80
  },
  subtitle: {
    fontSize: 50,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    top: -60
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    top: -70
  },
  inputContainer: {
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  buttonFilled: {
    backgroundColor: '#6CA94F',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonFilledText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  or: {
    marginTop: 50,
    textAlign: 'center',
    color: 'grey',
    marginBottom: 20
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  iconSocial: {
    width: 40,
    height: 40,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#9B8F5D',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#9B8F5D',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: 'grey'
  },
});

