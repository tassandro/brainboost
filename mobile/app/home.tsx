// // home.tsx

import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, gap: 10,}}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Página Inicial</Text>

      {isAuthenticated ? (
        <>
          <Text style={{ fontSize: 18, marginBottom: 10 }}> Bem-vindo!</Text>
          <Button title="Sair" onPress={logout} />
        </>
      ) : (
        <Button title="Fazer login" onPress={() => router.push('/login')} />
      )}

      <Button title="index" onPress={() => navigation.navigate('index' as never) }/>
      <Button title="profile" onPress={() => router.push('/profile') }/>
      <Button title="register" onPress={() => router.push('/register') }/>
    </View>
  );
}
