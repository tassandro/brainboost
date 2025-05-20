import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@cont/AuthContext';
import { registerUser } from '@sv/authService';
import { useRouter } from 'expo-router';

import BackIcon from '@img/arrowBack.svg';
import BrainLogo from '@img/BrainLogo.svg';
import AppScreen from '@comp/AppScreen';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    setError('');

    try {
      const res = await registerUser(fullName, username, password);
      login(res.data.access_token);
      router.push('/(tabs)/profile');
    } catch (err: any) {
      console.error('Erro no registro:', err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Erro ao registrar. Tente novamente.');
      }
    }
  };

  return (
    <AppScreen backgroundColor="#f9f9f9">
      <View style={styles.container}>
        <BrainLogo width={130} height={130} />

        <View style={styles.card}>
          {/* Botão de Voltar */}
          <TouchableOpacity
            onPress={() => navigation.goBack()} // ou router.push('/home') se usar expo-router
            style={{
              position: 'absolute',
              top: 75,
              left: 30,
              zIndex: 10,
            }}
          >
            <BackIcon width={44} height={44} fill="#6b7280" />
          </TouchableOpacity>

          {/* Título */}
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Login details</Text>

          {/* Erro */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Formulário */}
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 16,
  },
  card: {
    // backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400,
    borderRadius: 30,
    padding: 30,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // elevation: 8,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#537459e5',
    borderRadius: 999,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    elevation: 2,
    width: '35%',
    alignSelf: 'center',
  },
  button2: {
    backgroundColor: '#ccc',
    borderRadius: 999,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    elevation: 2,
    width: '40%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
