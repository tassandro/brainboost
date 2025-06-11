import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@cont/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useData } from '@cont/DataContext';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

type FloatingMenuProps = {
  position?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
};

export default function FloatingMenu({ position }: FloatingMenuProps) {
  const [visible, setVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(width));
  const navigation = useNavigation();
  const { isAuthenticated, logout } = useAuth();

  const openMenu = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: width * 0.3,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenuAsync = () =>
    new Promise<void>((resolve) => {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setVisible(false);
        resolve();
      });
    });

  const handleNavigate = (screen: string) => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setVisible(false);
      setTimeout(() => {
        navigation.navigate(screen as never);
      }, 0);
    });
  };

  const handleLogout = async () => {
    await closeMenuAsync();     // aguarda fim da animação
    console.log('Menu fechado');
    console.log('Realizando logout...');
    await logout();             // aguarda logout
    console.log('Logout realizado');
    console.log('Redirecionando para login...');
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // espera 100ms
    router.replace("/login");  // só então navega
    console.log('Redirecionamento completo');
  };

  const { setVideoData } = useData();
  const router = useRouter();

  const iniciarSimulacao = () => {
    setVideoData({
      id_video: 'fake_video_id',
      link_video: 'https://example.com/fake_video.mp4',
      resumo_video: 'Esse é um resumo fictício de um vídeo de simulação para teste da lógica de perguntas e respostas.',
      questions: [
        {
          id_question: 'q1',
          texto_questao: 'Qual é a capital da França?',
          alternatives: ['Berlim', 'Madri', 'Paris', 'Lisboa'],
          correct_answer: 'Paris',
          userAnswer: null,
          pontuacao: 1,
        },
        {
          id_question: 'q2',
          texto_questao: 'Quanto é 5 x 6?',
          alternatives: ['11', '30', '56', '60'],
          correct_answer: '30',
          userAnswer: null,
          pontuacao: 1,
        },
        {
          id_question: 'q3',
          texto_questao: 'Quem escreveu "Dom Casmurro"?',
          alternatives: ['Machado de Assis', 'Clarice Lispector', 'Carlos Drummond', 'Graciliano Ramos'],
          correct_answer: 'Machado de Assis',
          userAnswer: null,
          pontuacao: 1,
        },
      ],
    });

    router.push('/questions');
  };

  return (
    <>
      <TouchableOpacity style={[styles.fab, position || styles.defaultPosition]} onPress={openMenu}>
        <Ionicons name="menu" size={32} color="#fff" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="none">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.overlay} onPress={closeMenuAsync} activeOpacity={1} />

          <Animated.View style={[styles.drawer, { right: slideAnim }]}>
            <SafeAreaView style={styles.drawerContent}>
              {/* <TouchableOpacity onPress={() => handleNavigate('home')}>
                <Text style={styles.menuItem}>Home</Text>
              </TouchableOpacity> */}

              {isAuthenticated && (
                <TouchableOpacity onPress={() => handleNavigate('profile')}>
                  <Text style={styles.menuItem}>Edit Profile</Text>
                </TouchableOpacity>
              )}
              {isAuthenticated && (
                <TouchableOpacity onPress={() => handleNavigate('presentation')}>
                  <Text style={styles.menuItem}>About</Text>
                </TouchableOpacity>
              )}
              {isAuthenticated && (
                <TouchableOpacity onPress={() => iniciarSimulacao()}>
                  <Text style={styles.menuItem}>Questions</Text>
                </TouchableOpacity>
              )}
              {isAuthenticated ? (
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.menuItem}>Logout</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleNavigate('login')}>
                  <Text style={styles.menuItem}>Login</Text>
                </TouchableOpacity>
              )}
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor: '#537459',
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  defaultPosition: {
    bottom: 24,
    left: 20,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#00000055',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: width * 0.7,
    backgroundColor: '#537459',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    elevation: 12,
  },
  drawerContent: {
    flex: 1,
    padding: 24,
    backgroundColor: '#537459',
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 12,
    textAlign: 'left',
    color: '#FFF',
  },
});
