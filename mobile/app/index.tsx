import { Pressable, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useCallback, useState } from 'react';
import Logo from '@img/BrainLogo.svg';
import AppScreen from '@comp/AppScreen'; // ajuste o path conforme seu projeto
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();
  const [hasNavigated, setHasNavigated] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const navigateToHome = useCallback(() => {
    if (!hasNavigated) {
      setHasNavigated(true);
      router.replace('/presentation' as never);
    }
  }, [hasNavigated, router]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigateToHome();
    }, 6000);

    return () => clearTimeout(timer);
  }, [fadeAnim, navigateToHome]);

  return (
    <AppScreen backgroundColor='#f9f9f9'>
      <Pressable
        style={[styles.container, { paddingBottom: Math.max(insets.bottom, 40) }]}
        onPress={navigateToHome}
      >
        <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
          <Logo width={140} height={140} />
          <Text style={styles.welcomeText}>Welcome to BrainBoost!</Text>
        </Animated.View>
      </Pressable>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
});
