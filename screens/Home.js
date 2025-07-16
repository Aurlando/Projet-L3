import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="black" /></TouchableOpacity>
      <Image source={require('./../assets/auth-vector.png')} style={styles.logo} />
      <Text style={styles.Text}>Hiteny</Text>
      <Text style={styles.TextDescri}>Apprenez le Malagasy. Découvrez Madagascar</Text>
      <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('inscription')}><Text style={styles.buttonOutlineText}>Créer un compte</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('connexion')} style={styles.buttonOutline}><Text style={styles.buttonOutlineText}>Se connecter</Text></TouchableOpacity>
      <TouchableOpacity style={styles.buttonFilled} onPress={() => navigation.navigate('accueil')}><Text style={styles.buttonFilledText}>Continuer sans compte</Text></TouchableOpacity>
      <Text style={styles.TextFooter}>Fonctionnalités limitées disponibles en mode invité</Text>
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
    top: 50,
    left: 20,
  },
  logo: {
    width: 150,
    height: 200,
    alignSelf: 'center',
    top: -30
  },
  Text: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    top: -30,
  },
  TextDescri: {
    fontSize: 25,
    color: 'grey',
    textAlign: 'center',
    top: -10,
    marginBottom: 100
  },
  buttonFilled: {
    borderColor: '#6CA94F',
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    marginTop: 50,
  },
  buttonFilledText: {
    fontSize: 20,
    color: '#6CA94F',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderWidth: 1.5,
    backgroundColor: '#6CA94F',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonOutlineText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  TextFooter: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginTop: 5
  }
});

export default Home
