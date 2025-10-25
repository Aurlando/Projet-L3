import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation';
import { useTheme } from '../hooks/useTheme';

/**
 * Écran de découverte de Madagascar
 * Affiche des informations culturelles, des lieux, de la nourriture et des faits sur Madagascar
 * @param {Object} navigation - Objet de navigation React Navigation
 */
const Decouverte = ({ navigation }) => {
  // État pour la barre de recherche
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme();
  const titleColor = theme === 'dark' ? '#fff' : '#222';
  const sectionLabelColor = theme === 'dark' ? '#fff' : '#222';

  // Configuration des catégories de découverte
  const categories = [
    { id: 1, title: 'Lieux', icon: 'location', color: '#4CAF50' },
    { id: 2, title: 'Culture', icon: 'heart', color: '#F44336' },
    { id: 3, title: 'Nourriture', icon: 'restaurant', color: '#FF9800' },
    { id: 4, title: 'Festival', icon: 'calendar', color: '#4CAF50' },
  ];

  // Contenu en vedette avec les vraies images de Madagascar
  const featuredContent = [
    {
      id: 1,
      title: "L'Allée des Baobabs",
      subtitle: "Lieu emblématique du coucher de soleil",
      description: "L'un des endroits les plus photographiés de Madagascar avec un ancien baobab.",
      readTime: "3 min de lecture",
      category: "Lieux",
      image: require('./../assets/image/alle-baobab.jpg'), // Vraie image de l'allée des baobabs
    },
    {
      id: 2,
      title: "Hiragasy",
      subtitle: "Art traditionnel",
      description: "Découvrez le mélange unique de musique, de danse et d'art oratoire dans la culture Malagasy.",
      readTime: "5 min de lecture",
      category: "Culture",
      image: require('./../assets/image/hiragasy.jpg'), // Vraie image du hiragasy
    },
    {
      id: 3,
      title: "Recette de Romazava",
      subtitle: "Ragoût de bœuf traditionnel",
      description: "Apprenez à cuisiner le plat national de Madagascar avec des ingrédients authentiques.",
      readTime: "4 min de lecture",
      category: "Nourriture",
      image: require('./../assets/image/romazava.jpg'), // Vraie image du romazava
    },
  ];

  // Faits rapides sur Madagascar
  const quickFacts = [
    {
      id: 1,
      title: "Quatrième plus grande île",
      description: "Madagascar est la 4ème plus grande île du monde",
      icon: "island",
    },
    {
      id: 2,
      title: "Faune unique",
      description: "90 % des espèces ne se trouvent nulle part ailleurs sur Terre",
      icon: "paw",
    },
    {
      id: 3,
      title: "Langue Malagasy",
      description: "Parlé par plus de 18 millions de personnes dans le monde",
      icon: "chat",
    },
    {
      id: 4,
      title: "Point chaud de la biodiversité",
      description: "Abrite 5 % des espèces végétales et animales du monde",
      icon: "leaf",
    },
  ];

  const handleCategoryPress = (category) => {
    //if (category.title === 'Culture') {
      navigation.navigate('culture');
    //}
    // You can add more navigation for other categories if needed
  };

  const renderCategoryCard = (category) => (
    <TouchableOpacity key={category.id} style={styles.categoryCard} onPress={() => handleCategoryPress(category)}>
      <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
        <Ionicons name={category.icon} size={24} color="#fff" />
      </View>
      <Text style={styles.categoryTitle}>{category.title}</Text>
      <Text style={styles.categorySubtitle}>Appuyez pour explorer</Text>
    </TouchableOpacity>
  );

  const renderFeaturedCard = (item) => (
    <TouchableOpacity key={item.id} style={styles.featuredCard}>
      <Image source={item.image} style={styles.featuredImage} />
      <View style={styles.featuredContent}>
        <View style={styles.featuredHeader}>
          <Text style={styles.featuredTitle}>{item.title}</Text>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
        <Text style={styles.featuredDescription}>{item.description}</Text>
        <View style={styles.featuredFooter}>
          <Text style={styles.readTime}>{item.readTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderQuickFact = (fact) => (
    <View key={fact.id} style={styles.quickFactCard}>
      <View style={styles.quickFactIcon}>
        <MaterialCommunityIcons name={fact.icon} size={24} color="#6CA94F" />
      </View>
      <Text style={styles.quickFactTitle}>{fact.title}</Text>
      <Text style={styles.quickFactDescription}>{fact.description}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={titleColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: titleColor }]}>Découvrir Madagascar</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={24} color={titleColor} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: sectionLabelColor }]}>Explorez la riche culture de Madagascar</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher la culture, les lieux, la nourriture..."
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Categories */}
        <Text style={[styles.sectionTitle, { color: sectionLabelColor }]}>Catégories</Text>
        <View style={styles.categoriesContainer}>
          {categories.map(renderCategoryCard)}
        </View>

        {/* Featured Content */}
        <Text style={[styles.sectionTitle, { color: sectionLabelColor }]}>Contenu en vedette</Text>
        <View style={styles.featuredContainer}>
          {featuredContent.map(renderFeaturedCard)}
        </View>

        {/* Quick Facts */}
        <Text style={[styles.sectionTitle, { color: sectionLabelColor }]}>Faits en bref</Text>
        <View style={styles.quickFactsContainer}>
          {quickFacts.map(renderQuickFact)}
        </View>

        {/* Join Community */}
        <TouchableOpacity style={styles.joinCommunityCard}>
          <Text style={styles.joinCommunityTitle}>Vous souhaitez en savoir plus ?</Text>
          <Text style={styles.joinCommunityText}>
            Rejoignez notre communauté et découvrez les trésors cachés de la culture Malagasy
          </Text>
        </TouchableOpacity>

                {/* Espace pour la navigation fixe */}
        <View style={styles.navigationSpacer} />
      </ScrollView>

      {/* Navigation fixe en bas */}
      <BottomNavigation navigation={navigation} currentScreen="decouverte" />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000', // This line is commented out as per the edit hint
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
    fontSize: 20,
    fontWeight: 'bold',
    // color: '#fff', // This line is commented out as per the edit hint
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    // color: '#999', // This line is commented out as per the edit hint
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 30,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: '#fff', // This line is commented out as per the edit hint
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  featuredContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featuredCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  featuredContent: {
    padding: 15,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
        flex: 1,
  },
  categoryTag: {
    backgroundColor: '#6CA94F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryTagText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#6CA94F',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
    lineHeight: 20,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 12,
    color: '#666',
  },
  quickFactsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  quickFactCard: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  quickFactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickFactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  quickFactDescription: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 16,
  },
  joinCommunityCard: {
    backgroundColor: '#6CA94F',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  joinCommunityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  joinCommunityText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
  },
  navigationSpacer: {
    height: 80, // Espace pour la navigation fixe
  },
});

export default Decouverte;