import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';

const { width } = Dimensions.get('window');

// Individual Slide Component
const WelcomeSlide = ({ title, description, imageSource, isLastSlide, onNext, onSkip, onGetStarted }) => {
  return (
    <View style={styles.slideContainer}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        {isLastSlide ? (
          <TouchableOpacity onPress={onGetStarted} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Get Started</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onNext} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const Welcome = ({ navigation }) => {
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Define your slides data
  const slides = [
    {
      key: '1',
      image: require('./../assets/hi-maki.png'), // Adjust path as per your project structure
      title: 'Tongasoa eto amin\'i Hiteny!',
      description: 'Apprenez la langue Malagasy avec nos cours interactifs et notre aperçu culturel.',
    },
    {
      key: '2',
      image: require('./../assets/translate-img.png'), // Adjust path
      title: 'Handika avy hatrany',
      description: 'Traduisez entre le malgache, le français et l\'anglais avec notre traducteur intégré.',
    },
    {
      key: '3',
      image: require('./../assets/chatbot-img.png'), // Adjust path
      title: 'Miresaha amin\'ny chatbot',
      description: 'Pratiquez des conversations et améliorez votre vocabulaire avec notre assistant IA.',
    },
    {
      key: '4',
      image: require('./../assets/discover-img.png'), // Adjust path
      title: 'Fantaro ny momba an\'i Madagasikara',
      description: 'Explorez la riche culture, les traditions et la beauté de Madagascar.',
    },
  ];

  const handlePageScroll = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const goToNextPage = () => {
    if (pagerRef.current && currentPage < slides.length - 1) {
      pagerRef.current.setPage(currentPage + 1);
    }
  };

  const handleSkip = async() => {
    navigation.navigate('home');
  };

  const handleGetStarted = async() => {
    navigation.navigate('home');
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={handlePageScroll}
      >
        {slides.map((slide, index) => (
          <View key={slide.key} style={{ flex: 1}}>
            <WelcomeSlide
              title={slide.title}
              description={slide.description}
              imageSource={slide.image}
              isLastSlide={index === slides.length - 1}
              onNext={goToNextPage}
              onSkip={handleSkip}
              onGetStarted={handleGetStarted}
            />
          </View>
        ))}
      </PagerView>

      <View style={styles.paginationDots}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentPage ? '#8BC34A' : '#CCC' }, // Active dot color
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Dark background for the bottom part
  },
  pagerView: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF', // White background for the top image part
    paddingTop: 50, // Adjust as needed
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8, // Adjust image width
    height: width * 0.6, // Adjust image height
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute', // Position buttons at the bottom
    bottom: 30, // Adjust as needed
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    // backgroundColor: '#EEE',
  },
  skipButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#8BC34A', // Green button color
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100, // Adjust to position above buttons
    width: '100%',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Welcome;