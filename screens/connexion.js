import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './locales/firebase';
import { Button } from 'react-native-paper';


export default function Connexion({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Connexion réussie ✅');
      navigation.navigate('accueil'); // adapte selon ton app
    } catch (error) {
      alert('Erreur : ' + error.message);
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
      <Text style={styles.subtitle}>Se connecter</Text>
      <Text style={styles.TextDescri}>Connectez-vous pour continuer votre voyage linguistique</Text>

      {/* Champ Email */}
      <View style={styles.inputContainer}>
        <Entypo name="email" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="votremail@gmail.com"
          placeholderTextColor="grey"
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
          placeholderTextColor="grey"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Lien Mot de passe oublié */}
      <TouchableOpacity style={{width: 150}} onPress={() => navigation.navigate('forgot')}>
        <Text style={styles.forgot}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.Buttonconnexion}
        onPress={handleLogin}
        >
        <Text style={styles.Connexion}>Connexion</Text>
      </TouchableOpacity>

      {/* Connexion avec Facebook/Google */}
        <Text style={styles.or}>Se connecter avec</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image source={{ uri: 'https://img.icons8.com/color/48/facebook-new.png' }} style={styles.iconSocial} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }} style={styles.iconSocial} />
        </TouchableOpacity>
      </View>

      {/* Lien inscription */}
      <Text style={styles.signupText}>
        Pas encore de compte ? <Text style={styles.signupLink} onPress={() => navigation.navigate('inscription')}>Inscrivez-vous</Text>
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
    position: 'absolute',
    left: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: -100
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    top: -50,
    marginBottom: 20,
  },
  TextDescri: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    top: -50
  },
  inputContainer: {
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 8,
    marginBottom: 10
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  Buttonconnexion: {
    backgroundColor: '#6CA94F',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 50
  },
  Connexion:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forgot: {
    alignSelf: 'flex-start',
    color: '#A2A2A2',
    marginBottom: 50
  },
  or: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 50
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
  signupText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#A2A2A2',
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#A2A2A2',
  },
});
