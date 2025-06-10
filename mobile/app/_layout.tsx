import { Slot } from 'expo-router';
import { AuthProvider } from '@cont/AuthContext';
import { DataProvider } from '../contexts/DataContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
    <AuthProvider>
      <DataProvider>
        <Slot />
      </DataProvider>
    </AuthProvider>
    </SafeAreaProvider>
  );
}
