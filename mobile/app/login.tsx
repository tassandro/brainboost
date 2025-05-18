import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@cont/AuthContext';
import { loginUser } from '@sv/authService';
import { useRouter } from 'expo-router';

import BackIcon from '@img/arrowBack.svg';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated, navigating to profile');
      router.push('/(tabs)/profile'); // ajuste o nome da rota conforme seu stack
    }
  }, [isAuthenticated, navigation]);

  const handleSubmit = async () => {

    setError('');
    try {
      const res = await loginUser(username, password);

      login(res.data.access_token);
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError('Credenciais inválidas');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('home' as never)} // ou router.push('/home') se usar expo-router
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10,
        }}
      >
        <BackIcon width={44} height={44} fill="#6b7280" />
      </TouchableOpacity>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Your credentials</Text>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

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
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#537459e5',
    borderRadius: 999,
    height: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  forgot: {
    fontSize: 13,
    color: '#444',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});
