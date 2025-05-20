import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import AppScreen from '@comp/AppScreen';
import { useAuth } from '@cont/AuthContext';
import { isTokenValid } from '@sv/authService';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 400;

const slides = [
  {
    key: '1',
    title: 'Commerce',
    description:
      'More and more third world science and technology advanced people are heading for new proposed worlds.',
    image: require('@img/img1.jpeg'),
  },
  {
    key: '2',
    title: 'Innovation',
    description: 'New ideas changing the world with creative solutions.',
    image: require('@img/img2.jpeg'),
  },
  {
    key: '3',
    title: 'Connectivity',
    description: 'Bringing people closer than ever before.',
    image: require('@img/img3.jpeg'),
  },
];

export default function HomeScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  const { token } = useAuth();

  const handleContinue = () => {
    if (isTokenValid(token)) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      {/* Status bar transparente para a imagem aparecer atrás */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Imagem fora da safe area, ocupando o topo real */}
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* Imagem absoluta pegando o topo da tela */}
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <AppScreen backgroundColor="f9f9f9">
              <View style={styles.slideContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </AppScreen>
          </View>
        )}
      />

      {/* Dots + botão fora do AppScreen também */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleContinue()}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    height: '100%',
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT + StatusBar.currentHeight!,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  slideContent: {
    marginTop: IMAGE_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#537459e5',
  },
  button: {
    backgroundColor: '#537459e5',
    borderRadius: 999,
    height: 48,
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
