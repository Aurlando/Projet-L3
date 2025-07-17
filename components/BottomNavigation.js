import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Composant de navigation fixe en bas de l'écran
 * @param {Object} navigation - Objet de navigation React Navigation
 * @param {string} currentScreen - Nom de l'écran actuel pour mettre en surbrillance
 */
const BottomNavigation = ({ navigation, currentScreen = 'accueil' }) => {
  // Configuration des éléments de navigation
  const navItems = [
    {
      id: 'accueil',
      label: 'Accueil',
      icon: 'home',
      iconType: 'Ionicons',
      screen: 'accueil'
    },
    {
      id: 'lecon',
      label: 'Leçons',
      icon: 'book-outline',
      iconType: 'Ionicons',
      screen: 'lecon'
    },
    {
      id: 'traduction',
      label: 'Traduction',
      icon: 'translate',
      iconType: 'MaterialIcons',
      screen: 'traduction'
    },
    {
      id: 'chatbot',
      label: 'Chatbot',
      icon: 'robot-confused-outline',
      iconType: 'MaterialCommunityIcons',
      screen: 'chatbot'
    },
    {
      id: 'decouverte',
      label: 'Découvrir',
      icon: 'map-outline',
      iconType: 'Ionicons',
      screen: 'decouverte'
    }
  ];

  // Fonction pour rendre l'icône selon le type
  const renderIcon = (item, isActive) => {
    const iconColor = isActive ? '#6CA94F' : '#fff';
    const iconSize = 24;

    switch (item.iconType) {
      case 'Ionicons':
        return <Ionicons name={item.icon} size={iconSize} color={iconColor} />;
      case 'MaterialIcons':
        return <MaterialIcons name={item.icon} size={iconSize} color={iconColor} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={item.icon} size={iconSize} color={iconColor} />;
      default:
        return <Ionicons name={item.icon} size={iconSize} color={iconColor} />;
    }
  };

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            {renderIcon(item, isActive)}
            <Text style={[
              styles.navText,
              isActive && styles.activeNavText
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  activeNavText: {
    color: '#6CA94F',
    fontWeight: 'bold',
  },
});

export default BottomNavigation; 