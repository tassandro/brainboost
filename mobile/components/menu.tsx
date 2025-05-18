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

const { width } = Dimensions.get('window');

export default function FloatingMenu() {
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

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setVisible(false));
  };
  
  const handleNavigate = (screen: string) => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setVisible(false);
      setTimeout(() => {
        navigation.navigate(screen as never);
      }, 0); // aguarda 1 frame para garantir desmontagem
    });
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigation.navigate('home' as never);
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={openMenu}>
        <Ionicons name="menu" size={32} color="#fff" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="none">
        <View style={styles.modalContainer}>
          {/* Fundo semi-transparente clicável para fechar o menu */}
          <TouchableOpacity style={styles.overlay} onPress={closeMenu} activeOpacity={1} />

          {/* Menu deslizante */}
          <Animated.View style={[styles.drawer, { right: slideAnim }]}>
            <SafeAreaView style={styles.drawerContent}>
              <TouchableOpacity onPress={() => handleNavigate('home')}>
                <Text style={styles.menuItem}>Home</Text>
              </TouchableOpacity>
              {/* 
              <TouchableOpacity onPress={() => handleNavigate('about')}>
                <Text style={styles.menuItem}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigate('contact')}>
                <Text style={styles.menuItem}>Contact</Text>
              </TouchableOpacity>
              */}
              {isAuthenticated && (
                <TouchableOpacity onPress={() => handleNavigate('profile')}>
                  <Text style={styles.menuItem}>Profile</Text>
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
    bottom: 24,
    left: 20,
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
