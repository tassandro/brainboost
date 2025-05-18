// app/index.tsx
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '@img/BrainLogo.svg';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#F0F8FF' }}>
      <Logo width={140} height={140} style={{ marginBottom: 30 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 }}>
        Welcome to BrainBoost!
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/home')}>
        <Text style={styles.buttonText}>Brain it now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#537459e5',
    borderRadius: 999,
    height: 48,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
})
